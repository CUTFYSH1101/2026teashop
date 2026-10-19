const SPREADSHEET_TITLE = '2026手搖飲點餐記錄';
const SHEET_NAME = '訂單';
const HEADERS = ['送出時間', '姓名', '飲品分類', '飲品', '冷熱', '容量', '甜度', '冰量', '加料', '備註', '金額（元）'];

function doGet(event) {
  const action = event?.parameter?.action || 'orders';
  if (action === 'setup') {
    const spreadsheet = getOrCreateSpreadsheet_();
    return respond_({ ok: true, title: spreadsheet.getName(), url: spreadsheet.getUrl() }, event);
  }
  if (action === 'orders') {
    const sheet = getOrCreateSpreadsheet_().getSheetByName(SHEET_NAME);
    const values = sheet.getDataRange().getValues();
    const orders = values.slice(1).filter(row => row[1]).reverse().map(row => ({
      createdAt: row[0] instanceof Date ? row[0].toISOString() : String(row[0]),
      name: String(row[1]),
      category: String(row[2]),
      drink: String(row[3]),
      temperature: String(row[4]),
      size: String(row[5]),
      sugar: String(row[6]),
      ice: String(row[7]),
      addons: String(row[8]),
      note: String(row[9]),
      price: Number(row[10]) || 0
    }));
    return respond_({ ok: true, orders }, event);
  }
  return respond_({ ok: false, error: 'Unknown action' }, event);
}

function doPost(event) {
  try {
    const payload = JSON.parse(event?.parameter?.payload || '{}');
    const name = String(payload.name || '').trim();
    const drink = String(payload.drink || '').trim();
    const price = Number(payload.price);
    if (!name || !drink || !Number.isFinite(price) || price < 0) {
      throw new Error('姓名、飲品與有效金額為必填欄位。');
    }
    const sheet = getOrCreateSpreadsheet_().getSheetByName(SHEET_NAME);
    sheet.appendRow([
      new Date(), name, String(payload.category || ''), drink,
      String(payload.temperature || ''), String(payload.size || ''),
      String(payload.sugar || ''), String(payload.ice || ''),
      String(payload.addons || '無'), String(payload.note || ''), price
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSpreadsheet_() {
  const properties = PropertiesService.getScriptProperties();
  const spreadsheetId = properties.getProperty('SPREADSHEET_ID');
  let spreadsheet;
  if (spreadsheetId) {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  } else {
    spreadsheet = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create(SPREADSHEET_TITLE);
    spreadsheet.setName(SPREADSHEET_TITLE);
    properties.setProperty('SPREADSHEET_ID', spreadsheet.getId());
  }
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.getSheets()[0].setName(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#7f1834').setFontColor('#ffffff');
    sheet.autoResizeColumns(1, HEADERS.length);
  }
  return spreadsheet;
}

function respond_(data, event) {
  const callback = String(event?.parameter?.callback || '');
  if (callback && /^[A-Za-z_$][\w$]*$/.test(callback)) {
    return ContentService.createTextOutput(`${callback}(${JSON.stringify(data)});`).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}