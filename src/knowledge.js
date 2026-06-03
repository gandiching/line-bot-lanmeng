export const business = {
  name: "藍夢潛水 Bluedream Dive",
  phone: "0928572381",
  lineId: "@bluedreamdive",
  hours: "每日 09:00-21:00",
  timezone: "Asia/Taipei",
  bookingFormUrl:
    "https://docs.google.com/forms/d/1vmiOgRtrAc4K_u9LRhuL6_iE56sCRa41Nvs-SxyrRao/viewform"
};

export const handoffText = "我會將問題轉交給教練，他們會在課後時間回覆您。";

export const persona =
  "我是藍夢潛水 Bluedream Dive 的專屬 AI 客服，會以親切、溫暖、自然的口吻協助顧客，避免過度行銷。所有回答僅依藍夢潛水知識庫內容回覆；若資料不足，會轉交教練。";

export const knowledge = [
  {
    id: "basic",
    title: "店家資訊",
    keywords: ["藍夢", "聯絡", "電話", "官方帳號", "line", "營業", "時間", "地址", "客服"],
    reply:
      "藍夢潛水 Bluedream Dive\n\n聯絡電話：0928572381\nLINE 官方帳號：@bluedreamdive\n營業時間：每日 09:00-21:00\n\n想了解課程可以輸入「初階」、「進階」或「船潛」。"
  },
  {
    id: "ow",
    title: "初階 Open Water 課程",
    keywords: ["初階", "open water", "ow", "新手", "水肺", "課程", "考照", "證照", "padi", "adip"],
    reply:
      "初階 Open Water 課程費用\n\nADIP：$12,000\nPADI：$14,000\n\nPADI 是 1966 年成立的老牌潛水系統，ADIP 是 1996 年成立的系統，兩者皆為國際認證。藍夢教練雙修兩大系統，會彙整教學，只需選擇並支付一個系統費用。\n\n課程安排可分日上課，不需連續上完：\nDAY1 學科理論 5-6 小時\nDAY2 平靜水域 6 小時，氣瓶 1 支\nDAY3-4 開放水域，氣瓶 4 支"
  },
  {
    id: "aow",
    title: "進階 AOW 課程",
    keywords: ["進階", "aow", "advanced", "進階課程", "深潛", "船潛", "夜潛", "導航", "中性浮力"],
    reply:
      "進階 AOW 課程費用\n\nADIP：$13,000\nPADI：$15,000\n\n費用包含：國際證照簽證費、上課輕裝重裝、泳池門票費、氣瓶 5 支、潛水保險、教練費。\n\n另贈東北角船潛乙趟。\n\n課程安排可分日上課：\nDAY1 學科理論 3-4 小時\nDAY2 泳池練習 4 小時，氣瓶 1 支，包含初階複習、頂尖中性浮力、蛙式踢法\nDAY3 開放水域，氣瓶 4 支，包含深潛、船潛、夜潛、導航四項探險專長"
  },
  {
    id: "why",
    title: "為何選擇藍夢",
    keywords: ["為什麼", "優點", "推薦", "選擇", "特色", "小班", "接送", "團報", "照片", "影片"],
    reply:
      "選擇藍夢潛水的理由\n\n四人以上報名另有團報優惠。\n提供來回接送，包含台北捷運與東北角。\n小班制教學，重視安全照護。\n課程中會細心紀錄，包含照片與影片側拍。"
  },
  {
    id: "graduate",
    title: "畢業生保證",
    keywords: ["畢業", "跟潛", "練習", "導潛", "免導潛", "潛水孤兒", "後續"],
    reply:
      "藍夢畢業生保證\n\n藍夢畢業生後續到東北角跟潛練習，全程免導潛費。\n只需負擔部分費用，例如裝備、氣瓶、保險費。\n\n藍夢希望大家畢業後也能安心持續練習。"
  },
  {
    id: "boat",
    title: "船潛",
    keywords: ["船潛", "基隆", "正濱", "漁港", "潛點", "費用", "出團", "高氧", "氣瓶", "浪況"],
    reply:
      "船潛資訊\n\n費用：每人 $2,800\n成團：滿 6 人方可出團\n\n費用包含：高氧氣瓶 2 支、船資、導潛費、配重、保險。船上提供飲料、茶水與小點心。\n\n出發前會依浪況與船長討論，決定當日潛水地點。\n搭船地點：基隆正濱漁港，可視當日情況協助安排交通。\n建議上午進行船潛，因下午浪況較不穩定，也較容易有午後雷陣雨。"
  },
  {
    id: "spots",
    title: "常見船潛潛點",
    keywords: ["彩虹礁", "海建號", "大武崙", "海大花園", "鋼鐵礁", "水晶宮", "花牆", "野柳", "沈船", "潛點"],
    reply:
      "常見船潛潛點\n\n基隆嶼彩虹礁、海建號沈船、大武崙沈船、海大花園、鋼鐵礁、水晶宮、花牆、野柳放流、沈船塚、沈船博物館。"
  },
  {
    id: "freediving",
    title: "自由潛水",
    keywords: ["自由潛水", "自由潛", "free diving", "freediving"],
    reply: handoffText
  }
];

export const menuText =
  "您好，我是藍夢潛水 Bluedream Dive 的 AI 客服，很高興協助您。\n\n您可以輸入：\n「初階」了解 Open Water\n「進階」了解 AOW\n「船潛」了解船潛費用與潛點\n「報名」取得預約表單\n「營業時間」查看聯絡資訊\n\n我會依藍夢潛水目前提供的資料回答；若資料不足，會協助轉交教練。";
