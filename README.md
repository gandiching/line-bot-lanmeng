# 藍夢潛水 LINE 進階自動回覆機器人

這是一個可部署的 LINE Messaging API Webhook 機器人，已把 `AI知識庫(藍夢潛水).pdf` 裡的內容整理成客服知識庫。

## 角色設定

機器人設定為藍夢潛水 Bluedream Dive 的專屬 AI 客服，負責在 LINE 官方帳號、網站與社群平台上協助顧客。回覆口吻親切、溫暖、自然，避免過度行銷。

重要原則：所有回答只依知識庫內容。若知識庫沒有明確提及或資訊不足，會回覆：

```text
我會將問題轉交給教練，他們會在課後時間回覆您。
```

## 已內建的回覆主題

- 店家資訊、電話、LINE 官方帳號、營業時間
- 初階 Open Water 課程費用與課程安排
- 進階 AOW 課程費用、包含項目與課程安排
- 藍夢潛水特色、團報、接送、小班制、照片影片側拍
- 畢業生後續跟潛與免導潛費
- 船潛費用、成團人數、包含項目、集合地點、建議時間
- 常見船潛潛點
- 自由潛水目前資料不足時的客服引導
- 非營業時間提醒
- 訂課/預約意向紀錄到 Google 試算表

## 需要準備

1. LINE 官方帳號
2. LINE Developers 的 Messaging API Channel
3. Channel Secret
4. Channel Access Token
5. 一個可以提供 HTTPS 網址的部署平台，例如 Render、Railway、Fly.io、VPS

## 本機啟動

先複製 `.env.example` 成 `.env`，填入你的 LINE 資訊。

```bash
LINE_CHANNEL_SECRET=你的 Channel Secret
LINE_CHANNEL_ACCESS_TOKEN=你的 Channel Access Token
GOOGLE_SHEETS_WEBHOOK_URL=你的 Google Apps Script Web App URL
PORT=3000
```

啟動：

```bash
npm start
```

健康檢查：

```bash
curl http://localhost:3000/health
```

## LINE 後台設定

1. 到 LINE Developers Console
2. 進入你的 Messaging API Channel
3. Webhook URL 填入：

```text
https://你的網域/webhook
```

4. 啟用 Use webhook
5. 到 LINE 官方帳號管理後台，避免同時設定相同關鍵字的「自動回應訊息」，否則使用者可能收到兩份回覆

## 常用測試句

- 初階多少錢
- AOW 課程包含什麼
- 船潛在哪裡搭船
- 有哪些潛點
- 營業時間
- 畢業後可以跟潛嗎

## 維護知識庫

主要資料在：

```text
src/knowledge.js
```

要新增問題，只要在 `knowledge` 陣列新增一筆，包含：

- `id`
- `title`
- `keywords`
- `reply`

機器人會依使用者訊息和關鍵字做相似度比對，找出最適合的回覆。

## Google 試算表訂課紀錄

1. 建立一份 Google 試算表
2. 點「擴充功能」→「Apps Script」
3. 把 `google-apps-script/Code.gs` 的內容貼進 Apps Script
4. 部署為 Web App
5. 權限選「任何知道連結的人」可存取
6. 複製 Web App URL
7. 到 Render 的 Environment 新增：

```text
GOOGLE_SHEETS_WEBHOOK_URL=你的 Web App URL
```

機器人偵測到「預約、報名、訂課、想學」等訊息時，會把 LINE user id、課程類型與原始訊息寫入試算表。

## 安全性

Webhook 會驗證 LINE 的 `X-Line-Signature`。LINE 官方文件提醒，驗證簽章時必須使用原始 request body；如果先改動 body 字串，簽章驗證會失敗。
