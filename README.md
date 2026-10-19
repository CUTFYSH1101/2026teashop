# 春水堂班級飲料訂購

春水堂完整菜單點餐（飲品、茶點、主食、套餐與湯品）及班級訂單查詢，使用 GitHub Pages 發布，Google Apps Script 寫入 Google 試算表。

## 網頁

- 點餐：https://cutfysh1101.github.io/2026teashop/
- 目前訂單：https://cutfysh1101.github.io/2026teashop/orders.html

## Google 試算表與 Apps Script

1. 使用 `clasp login` 登入 Google 帳戶，並在 Apps Script 使用者設定中啟用 Apps Script API。
2. 在專案根目錄執行 `clasp create --type sheets --title "2026手搖飲點餐記錄" --rootDir apps-script`，建立綁定試算表的 Apps Script 專案。
3. 執行 `clasp push --rootDir apps-script` 推送程式。
4. 在綁定試算表的 Apps Script 編輯器執行一次 `setup()`，授權後建立標題列並保存試算表 ID。
5. 部署為 Web app，執行身分為「我」、存取權為「所有人」。
6. 將部署的 `/exec` 網址填入 `app.js` 與 `orders.js` 的 `APP_SCRIPT_URL`。

## GitHub Pages

網站發布於 [GitHub Pages](https://cutfysh1101.github.io/2026teashop/)。

`spec/` 為需求文件，不納入 GitHub repo。