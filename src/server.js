import http from "node:http";
import { afterHoursNotice } from "./business-hours.js";
import {
  buildBookingPrompt,
  detectBookingIntent,
  detectCourse,
  sendBookingToSheet
} from "./booking.js";
import { findAnswer } from "./search.js";
import { replyToLine, textMessage, verifyLineSignature } from "./line.js";
import { business, handoffText, menuText } from "./knowledge.js";

const port = Number(process.env.PORT || 3000);
const channelSecret = process.env.LINE_CHANNEL_SECRET;
const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const googleSheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

async function handleWebhook(req, res) {
  const rawBody = await readRequestBody(req);
  const signature = req.headers["x-line-signature"];

  if (!verifyLineSignature(rawBody, signature, channelSecret)) {
    sendJson(res, 401, { ok: false, error: "Invalid LINE signature" });
    return;
  }

  const body = JSON.parse(rawBody.toString("utf8"));

  for (const event of body.events || []) {
    if (event.type === "follow") {
      await replyToLine(
        event.replyToken,
        textMessage(`歡迎加入 ${business.name}！\n\n${menuText}${afterHoursNotice()}`),
        channelAccessToken
      );
      continue;
    }

    if (event.type !== "message" || event.message?.type !== "text") {
      await replyToLine(
        event.replyToken,
        textMessage("目前我主要能回答文字問題。你可以輸入「初階」、「進階」、「船潛」或「營業時間」。"),
        channelAccessToken
      );
      continue;
    }

    const incomingText = event.message.text;

    if (detectBookingIntent(incomingText)) {
      const course = detectCourse(incomingText);
      let sheetNotice = "";

      try {
        await sendBookingToSheet({
          webhookUrl: googleSheetsWebhookUrl,
          event,
          text: incomingText
        });
        sheetNotice = googleSheetsWebhookUrl ? "\n\n我已先幫您記錄這次諮詢。" : "";
      } catch (error) {
        console.error(error);
        sheetNotice = `\n\n${handoffText}`;
      }

      await replyToLine(
        event.replyToken,
        textMessage(`${buildBookingPrompt(course)}${sheetNotice}${afterHoursNotice()}`),
        channelAccessToken
      );
      continue;
    }

    const answer = findAnswer(incomingText);
    await replyToLine(
      event.replyToken,
      textMessage(`${answer.text}${afterHoursNotice()}`),
      channelAccessToken
    );
  }

  sendJson(res, 200, { ok: true });
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/") {
      sendJson(res, 200, {
        ok: true,
        service: "藍夢潛水 LINE Bot",
        endpoints: ["/webhook", "/health"]
      });
      return;
    }

    if (req.method === "GET" && req.url === "/health") {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "POST" && req.url === "/webhook") {
      await handleWebhook(req, res);
      return;
    }

    sendJson(res, 404, { ok: false, error: "Not found" });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { ok: false, error: "Server error" });
  }
});

server.listen(port, () => {
  console.log(`Bluedream LINE bot listening on port ${port}`);
});
