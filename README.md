# IG 諮詢預約單

用來蒐集使用者 Instagram 帳號、並選擇 5–30 分鐘專家諮詢時長的單頁表單。
使用 Next.js 14 + TypeScript + Tailwind CSS 製作。

目前**沒有接後端**：送出表單後資料只會印在瀏覽器 console，畫面會顯示「已收到」的確認狀態。
之後要接資料儲存，可以在 `app/page.tsx` 裡標記 `TODO` 的地方，改成呼叫一個
`app/api/book/route.ts` 的 API Route，再寫入 Google Sheet / Airtable / Email 等。

### 一天只能填一次

目前是用瀏覽器的 `localStorage` 記錄「今天填過了」，重新整理頁面、關掉分頁再打開都還是會鎖住，
要到隔天（依裝置本機日期判斷）或清掉瀏覽器資料才會解鎖。

要注意這只是**前端限制**，換瀏覽器、開無痕視窗、或手動清除 localStorage 都能繞過。
如果之後要做成真正擋得住的每日限制（例如綁 IP 或綁 Instagram 帳號本身），
就需要接上後端，在 API Route 裡做判斷。

## 本機開發

需要先安裝 [Node.js](https://nodejs.org/)（18 以上）。

```bash
npm install
npm run dev
```

打開 http://localhost:3000 即可看到頁面。

## 上傳到 GitHub

```bash
git init
git add .
git commit -m "Initial commit: IG 諮詢預約單"
```

到 GitHub 建立一個新的空 repository（不要勾選 README / .gitignore，避免衝突），
接著依照 GitHub 給的指令把本機 repo 推上去，例如：

```bash
git remote add origin https://github.com/<你的帳號>/<repo-名稱>.git
git branch -M main
git push -u origin main
```

## 部署到 Vercel

1. 打開 https://vercel.com ，用 GitHub 帳號登入。
2. 點 **Add New → Project**，選擇剛剛 push 上去的 repository。
3. Vercel 會自動偵測到這是 Next.js 專案，Framework Preset 保持預設即可，
   不需要額外設定 Build Command / Output Directory。
4. 點 **Deploy**，等待 build 完成後即可拿到一組 `*.vercel.app` 網址。

之後每次 `git push` 到 `main` 分支，Vercel 都會自動重新部署。

## SEO

專案已經內建：

- **Metadata**：`app/layout.tsx` 設定了 title / description / keywords、
  Open Graph、Twitter Card、canonical URL，都集中在 `app/site-config.ts` 方便統一修改。
- **結構化資料（JSON-LD）**：在 `<head>` 裡放了 `Service` schema，
  描述這是一個諮詢預約服務，方便搜尋引擎理解頁面內容。
- **自動產生的分享圖**：`app/opengraph-image.tsx` 會在分享到
  Facebook / X / LINE / Instagram 私訊時，自動產生票券樣式的預覽圖，
  不用手動做圖再上傳。
- **`robots.txt` / `sitemap.xml`**：由 `app/robots.ts` 與 `app/sitemap.ts`
  自動產生，部署後可以直接用 `/robots.txt`、`/sitemap.xml` 檢查。

### 部署後要做的事

1. 到 Vercel 專案的 **Settings → Environment Variables**，
   新增 `NEXT_PUBLIC_SITE_URL`，值設成你實際的網域（例如 `https://your-domain.com`），
   然後重新部署一次。這一步很重要——沒設的話，sitemap、canonical、og:url
   都會指向程式碼裡的預設網址，是錯的。
2. 打開 `https://你的網域/sitemap.xml` 和 `/robots.txt` 確認內容正確。
3. 到 [Google Search Console](https://search.google.com/search-console) 加入你的網域，
   並提交 `sitemap.xml`，加速被 Google 收錄。
4. 想確認分享卡片長怎樣，可以用
   [Meta 的分享除錯工具](https://developers.facebook.com/tools/debug/) 貼網址測試。

如果之後想針對特定關鍵字優化文案（例如你的產業、服務名稱），
可以直接改 `app/site-config.ts` 裡的 `SITE_TITLE` / `SITE_DESCRIPTION`，
其他地方會自動套用。

## 之後要接資料儲存時

在 `app/page.tsx` 的 `handleSubmit` 裡有標記 `TODO` 的位置，
把 `console.log(...)` 換成 `fetch("/api/book", { ... })`，
並新增 `app/api/book/route.ts` 這個 API Route 來處理實際的寫入邏輯
（例如寫進 Google Sheet、寄 Email 通知、或存到 Airtable）。
