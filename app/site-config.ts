// 部署到 Vercel 後，記得在 Project Settings → Environment Variables
// 設定 NEXT_PUBLIC_SITE_URL 為你實際的網域（例如 https://your-domain.com），
// 這樣 SEO 用到的絕對網址（sitemap、robots.txt、og:url…）才會正確。
function resolveSiteUrl(): string {
  const fallback = "https://ig-consult-booking.vercel.app";
  // 去掉貼上時常帶到的換行 / 空白，避免 new URL() 直接炸掉整個 build
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (!raw) return fallback;
  // 沒帶協定（例如只填了 your-domain.com）就補上 https://
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    // eslint-disable-next-line no-new
    new URL(withProtocol);
    return withProtocol;
  } catch {
    return fallback;
  }
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "IG 免費增粉";
export const SITE_TITLE = "免費增加5–30 位IG粉絲｜留下你的 Instagram";
export const SITE_DESCRIPTION =
  "留下你的 Instagram 帳號，選擇想增加 5 至 30 位IG粉絲，我們會在48小時內將粉絲增加至您的帳號。";
