// 部署到 Vercel 後，記得在 Project Settings → Environment Variables
// 設定 NEXT_PUBLIC_SITE_URL 為你實際的網域（例如 https://your-domain.com），
// 這樣 SEO 用到的絕對網址（sitemap、robots.txt、og:url…）才會正確。
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ig-consult-booking.vercel.app";

export const SITE_NAME = "IG 諮詢預約單";
export const SITE_TITLE = "5–30 分鐘專家諮詢預約｜留下你的 Instagram";
export const SITE_DESCRIPTION =
  "留下你的 Instagram 帳號，選擇想聊 5 到 30 分鐘，我們會透過 Instagram 私訊確認諮詢時間。";
