# J.Law Notepad（雲端版 / Mobile + PWA）

單一前端筆記應用：Rich Text、資料夾、Supabase 雲端同步、離線 LocalStorage、PDF／HTML 匯出。

## 快速開始（本機）

用任何靜態伺服器開啟（**不要**直接雙擊 `file://`，否則 Service Worker / 部分 API 會失效）：

```bash
# Python
python3 -m http.server 8080

# 或 Node
npx serve .
```

瀏覽器打開：http://localhost:8080

## 上傳 GitHub + 啟用 Pages

1. 到 GitHub 建立新 Repository（Public 即可免費用 Pages）
2. 上傳本資料夾全部內容（可用網頁 Upload，或下方 git 指令）
3. **Settings → Pages → Build and deployment**
   - Source：`Deploy from a branch`
   - Branch：`main`（或 `master`）／資料夾 `/ (root)`
4. 等待約 1 分鐘，取得網址：`https://<你的帳號>.github.io/<repo名稱>/`

### 用 Git 上傳範例

```bash
git init
git add .
git commit -m "Publish J.Law Notepad"
git branch -M main
git remote add origin https://github.com/<你的帳號>/<repo名稱>.git
git push -u origin main
```

## 目錄結構

```
.
├── index.html              # 主程式
├── sw.js                   # Service Worker（離線快取）
├── manifest.webmanifest    # PWA Manifest
├── icons/icon.svg          # App 圖示
├── vendor/
│   ├── tailwindcss.js
│   ├── html2canvas.min.js
│   └── jspdf.umd.min.js
└── README.md
```

## Supabase 設定

`index.html` 內已有 `SUPABASE_URL` / `SUPABASE_ANON_KEY`。  
若要換成自己的專案，請搜尋這兩個常數並替換，並在 Supabase 建立資料表（參考你原本的 `supabase_setup.sql`）。

> 注意：Anon Key 會出現在前端，請用 Row Level Security 限制寫入範圍。

## 功能摘要

- 雲端同步（Supabase Realtime）+ 離線 LocalStorage
- 資料夾、置頂、搜尋、拖曳排序
- Rich Text、顏色、螢光筆、Checklist、圖片壓縮插入
- 匯出 JSON / 獨立 HTML / PDF
- 手機：更多選單、格式列橫向滑動、虛擬鍵盤適配、側邊欄滑動手勢
- PWA：可「加到主畫面」、靜態資源離線快取

## 授權

個人專案，請自行決定授權條款。
