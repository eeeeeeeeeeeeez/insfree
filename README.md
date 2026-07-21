# IG 諮詢預約單

用來蒐集使用者 Instagram 帳號、並選擇 5–30 分鐘專家諮詢時長的單頁表單。
使用 Next.js 14 + TypeScript + Tailwind CSS 製作。

目前**沒有接後端**：送出表單後資料只會印在瀏覽器 console，畫面會顯示「已收到」的確認狀態。
之後要接資料儲存，可以在 `app/page.tsx` 裡標記 `TODO` 的地方，改成呼叫一個
`app/api/book/route.ts` 的 API Route，再寫入 Google Sheet / Airtable / Email 等。

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

## 之後要接資料儲存時

在 `app/page.tsx` 的 `handleSubmit` 裡有標記 `TODO` 的位置，
把 `console.log(...)` 換成 `fetch("/api/book", { ... })`，
並新增 `app/api/book/route.ts` 這個 API Route 來處理實際的寫入邏輯
（例如寫進 Google Sheet、寄 Email 通知、或存到 Airtable）。
