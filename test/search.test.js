import assert from "node:assert/strict";
import { buildBookingPrompt } from "../src/booking.js";
import { business } from "../src/knowledge.js";
import { findAnswer } from "../src/search.js";

const cases = [
  ["初階多少錢", "ADIP：$12,000"],
  ["AOW 課程包含什麼", "國際證照簽證費"],
  ["船潛在哪裡搭船", "基隆正濱漁港"],
  ["有哪些潛點", "基隆嶼彩虹礁"],
  ["營業時間", "每日 09:00-21:00"],
  ["畢業後可以跟潛嗎", "免導潛費"],
  ["自由潛水跟水肺潛水差在哪裡", "我會將問題轉交給教練"],
  ["可以介紹住宿嗎", "我會將問題轉交給教練"]
];

for (const [question, expected] of cases) {
  const answer = findAnswer(question);
  assert.equal(["answer", "menu", "fallback"].includes(answer.type), true, question);
  assert.equal(answer.text.includes(expected), true, `${question} should include ${expected}`);
}

assert.equal(
  buildBookingPrompt("初階 Open Water", business.bookingFormUrl).includes("/viewform"),
  true,
  "booking prompt should use customer-facing Google Form URL"
);

console.log("search tests passed");
