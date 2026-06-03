import { handoffText, knowledge, menuText } from "./knowledge.js";

const aliases = new Map([
  ["價格", "費用"],
  ["價錢", "費用"],
  ["多少錢", "費用"],
  ["報價", "費用"],
  ["報名", "課程"],
  ["考證", "證照"],
  ["ow", "open water"],
  ["aow", "進階"]
]);

export function normalize(input) {
  return String(input || "")
    .toLowerCase()
    .replace(/[，。！？!?,.、：:；;\[\]【】()（）"'`~\s]+/g, " ")
    .trim();
}

function expandTokens(text) {
  const normalized = normalize(text);
  const tokens = new Set(normalized.split(" ").filter(Boolean));

  for (const [from, to] of aliases) {
    if (normalized.includes(from)) {
      tokens.add(to);
    }
  }

  for (const token of Array.from(tokens)) {
    if (token.length >= 2) {
      for (let size = 2; size <= Math.min(4, token.length); size += 1) {
        for (let i = 0; i <= token.length - size; i += 1) {
          tokens.add(token.slice(i, i + size));
        }
      }
    }
  }

  return { normalized, tokens };
}

function scoreEntry(query, entry) {
  const { normalized, tokens } = expandTokens(query);
  if (!normalized) return 0;

  let score = 0;
  if (normalized.includes("aow")) {
    if (entry.id === "aow") score += 80;
    if (entry.id === "ow") score -= 40;
  } else if (/\bow\b|open water/.test(normalized)) {
    if (entry.id === "ow") score += 60;
    if (entry.id === "aow") score -= 20;
  }
  if (normalized.includes("潛點")) {
    if (entry.id === "spots") score += 60;
    if (entry.id === "boat") score -= 10;
  }

  const haystack = normalize([entry.title, ...entry.keywords, entry.reply].join(" "));

  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalize(keyword);
    if (!normalizedKeyword) continue;
    if (normalized.includes(normalizedKeyword)) score += 12;
    if (haystack.includes(normalizedKeyword) && tokens.has(normalizedKeyword)) score += 8;
  }

  for (const token of tokens) {
    if (token.length >= 2 && haystack.includes(token)) score += token.length;
  }

  return score;
}

export function findAnswer(message) {
  const text = normalize(message);
  if (!text || ["menu", "help", "目錄", "選單", "說明", "幫助"].includes(text)) {
    return {
      type: "menu",
      text: menuText
    };
  }

  const ranked = knowledge
    .map((entry) => ({ entry, score: scoreEntry(message, entry) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  if (!best || best.score < 6) {
    return {
      type: "fallback",
      text: handoffText
    };
  }

  return {
    type: "answer",
    text: best.entry.reply,
    matched: best.entry.id,
    score: best.score
  };
}
