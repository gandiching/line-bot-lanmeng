import { business } from "./knowledge.js";

export function getTaipeiHour(date = new Date()) {
  const hour = new Intl.DateTimeFormat("en-US", {
    timeZone: business.timezone,
    hour: "2-digit",
    hour12: false
  }).format(date);

  return Number(hour);
}

export function isBusinessHours(date = new Date()) {
  const hour = getTaipeiHour(date);
  return hour >= 9 && hour < 21;
}

export function afterHoursNotice(date = new Date()) {
  if (isBusinessHours(date)) return "";

  return `\n\n目前是非營業時間，藍夢潛水營業時間為${business.hours}。我會先協助留下資訊，教練會在課後時間回覆您。`;
}
