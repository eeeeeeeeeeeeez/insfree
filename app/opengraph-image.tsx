import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "免費增加 5–30 位IG粉絲";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF7F1",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 960,
            height: 460,
            background: "#FFFDF9",
            border: "3px solid #1C1B1F",
            boxShadow: "14px 14px 0 0 #1C1B1F",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(28,27,31,0.55)",
            }}
          >
            <span>Booking Slip ·IG免費增粉</span>
            <span>No. 000123</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#1C1B1F",
            }}
          >
            <span>免費增加 5–30 位IG粉絲</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 30,
                color: "rgba(28,27,31,0.7)",
              }}
            >
              @your.ig.id
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#2E3192",
                color: "#FAF7F1",
                fontSize: 26,
                fontWeight: 600,
                padding: "16px 32px",
                border: "3px solid #1C1B1F",
              }}
            >
              送出申請 →
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
