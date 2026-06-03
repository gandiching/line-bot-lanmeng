const bookingKeywords = ["預約", "報名", "訂課", "上課", "想學", "想報", "參加", "課程"];

export function detectBookingIntent(text) {
  const message = String(text || "").toLowerCase();
  return bookingKeywords.some((keyword) => message.includes(keyword));
}

export function detectCourse(text) {
  const message = String(text || "").toLowerCase();
  if (message.includes("aow") || message.includes("進階")) return "進階 AOW";
  if (message.includes("ow") || message.includes("open water") || message.includes("初階")) {
    return "初階 Open Water";
  }
  if (message.includes("船潛")) return "船潛";
  if (message.includes("自由潛")) return "自由潛水";
  return "未指定";
}

export function buildBookingPrompt(course = "課程") {
  return `可以的，我先幫您留下${course === "未指定" ? "課程" : course}諮詢資訊。\n\n請您回覆以下資料，教練會再確認安排：\n姓名：\n電話：\n想預約的課程：\n方便上課或聯絡的時間：`;
}

export async function sendBookingToSheet({ webhookUrl, event, text }) {
  if (!webhookUrl) return { ok: false, skipped: true };

  const payload = {
    timestamp: new Date().toISOString(),
    source: "LINE",
    userId: event.source?.userId || "",
    roomId: event.source?.roomId || "",
    groupId: event.source?.groupId || "",
    message: text,
    course: detectCourse(text)
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google Sheets webhook failed: ${response.status} ${body}`);
  }

  return { ok: true };
}
