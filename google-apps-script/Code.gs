const SHEET_NAME = 'LINE訂課紀錄';

function doPost(e) {
  const sheet = getOrCreateSheet_();
  const data = JSON.parse(e.postData.contents || '{}');

  sheet.appendRow([
    new Date(),
    data.source || '',
    data.userId || '',
    data.roomId || '',
    data.groupId || '',
    data.course || '',
    data.message || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      '建立時間',
      '來源',
      'LINE User ID',
      'Room ID',
      'Group ID',
      '課程',
      '原始訊息'
    ]);
  }

  return sheet;
}
