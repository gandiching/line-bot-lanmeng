import crypto from "node:crypto";

const LINE_REPLY_ENDPOINT = "https://api.line.me/v2/bot/message/reply";

export function verifyLineSignature(rawBody, signature, channelSecret) {
  if (!channelSecret || !signature) return false;

  const expected = crypto
    .createHmac("sha256", channelSecret)
    .update(rawBody)
    .digest("base64");

  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  return (
    expectedBuffer.length === signatureBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
  );
}

export async function replyToLine(replyToken, messages, channelAccessToken) {
  if (!replyToken || !channelAccessToken) return;

  const response = await fetch(LINE_REPLY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${channelAccessToken}`
    },
    body: JSON.stringify({
      replyToken,
      messages: Array.isArray(messages) ? messages : [messages]
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`LINE reply failed: ${response.status} ${body}`);
  }
}

export function textMessage(text) {
  return {
    type: "text",
    text: String(text).slice(0, 4900),
    quickReply: {
      items: [
        quickReplyText("初階", "初階 Open Water"),
        quickReplyText("進階", "進階 AOW"),
        quickReplyText("船潛", "船潛"),
        quickReplyText("聯絡", "營業時間")
      ]
    }
  };
}

function quickReplyText(label, text) {
  return {
    type: "action",
    action: {
      type: "message",
      label,
      text
    }
  };
}
