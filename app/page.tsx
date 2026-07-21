"use client";

import { useEffect, useState } from "react";

const TICKS = [5, 10, 15, 20, 25, 30];
const MIN = 5;
const MAX = 30;

// 用瀏覽器 local date 當作「今天」的判斷依據
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

const STORAGE_KEY = "ig-consult-booking:last-submission";

type Record_ = { date: string; instagram: string; minutes: number };

type Status = "checking" | "idle" | "submitted" | "locked";

export default function BookingPage() {
  const [handle, setHandle] = useState("");
  const [minutes, setMinutes] = useState(15);
  const [status, setStatus] = useState<Status>("checking");
  const [record, setRecord] = useState<Record_ | null>(null);
  const [error, setError] = useState("");
  const [ticketNo, setTicketNo] = useState("——");

  useEffect(() => {
    // 純前端展示用的隨機單號，避免 SSR / CSR 內容不一致
    setTicketNo(String(Math.floor(100000 + Math.random() * 899999)));

    // 檢查這個瀏覽器今天是否已經填過
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record_;
        if (parsed.date === todayKey()) {
          setRecord(parsed);
          setStatus("locked");
          return;
        }
      }
    } catch {
      // localStorage 讀取失敗（例如無痕模式限制），就當作沒填過
    }
    setStatus("idle");
  }, []);

  const percent = ((minutes - MIN) / (MAX - MIN)) * 100;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = handle.trim().replace(/^@/, "");

    if (!cleaned) {
      setError("請輸入你的 Instagram 帳號");
      return;
    }
    if (!/^[a-zA-Z0-9._]{1,30}$/.test(cleaned)) {
      setError("帳號格式看起來怪怪的，再檢查一下（僅限英數、句點、底線）");
      return;
    }

    setError("");

    const newRecord: Record_ = {
      date: todayKey(),
      instagram: cleaned,
      minutes,
    };

    // TODO：目前尚未串接後端。
    // 之後要接資料儲存時，可以在這裡改成：
    //
    // await fetch("/api/book", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ instagram: cleaned, minutes }),
    // });
    //
    // 並在 app/api/book/route.ts 建立對應的 API Route，
    // 寫入 Google Sheet / Airtable / Email 通知等你想要的目的地。
    console.log("預約送出：", newRecord);

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecord));
    } catch {
      // localStorage 寫入失敗就略過，不影響這次送出
    }

    setRecord(newRecord);
    setStatus("submitted");
  }

  const locked = status === "locked";
  const showForm = status === "idle";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="ticket -rotate-1 px-8 py-9 sm:px-10 sm:py-10">
          {/* Header */}
          <div className="flex items-start justify-between font-mono text-[11px] tracking-[0.18em] uppercase text-ink/60">
            <span>Booking Slip · 預約單</span>
            <span>No. {ticketNo}</span>
          </div>

          <h1 className="font-display font-semibold text-[2rem] sm:text-[2.3rem] leading-[1.15] mt-4">
            找專家聊
            <br />
            5–30 分鐘
          </h1>

          {showForm && (
            <p className="mt-3 text-sm text-ink/70 leading-relaxed">
              留下你的 Instagram，選一個你想聊的長度，
              我們會用 IG 私訊跟你確認實際時間。每個瀏覽器一天只能預約一次。
            </p>
          )}

          <div className="perforation my-7" />

          {status === "checking" && (
            <p className="font-mono text-xs text-ink/40">載入中…</p>
          )}

          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* IG handle */}
              <div>
                <label
                  htmlFor="ig-handle"
                  className="block font-mono text-[11px] tracking-[0.14em] uppercase text-ink/60 mb-2"
                >
                  你的 Instagram
                </label>
                <div className="flex items-center border-b-2 border-ink focus-within:border-coral transition-colors">
                  <span className="font-display text-lg text-ink/40 pr-1">
                    @
                  </span>
                  <input
                    id="ig-handle"
                    name="instagram"
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    placeholder="your.ig.id"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full bg-transparent py-2 font-display text-lg placeholder:text-ink/25 focus:outline-none"
                  />
                </div>
                {error && (
                  <p className="mt-2 text-xs text-coral font-medium">
                    {error}
                  </p>
                )}
              </div>

              {/* Duration slider */}
              <div>
                <div className="flex items-end justify-between mb-1">
                  <label
                    htmlFor="minutes"
                    className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink/60"
                  >
                    想聊多久
                  </label>
                  <span className="font-mono text-3xl leading-none tabular-nums">
                    {minutes}
                    <span className="text-sm text-ink/50 ml-1">分鐘</span>
                  </span>
                </div>

                <div className="pt-6 pb-2">
                  <input
                    id="minutes"
                    type="range"
                    className="timer-slider"
                    min={MIN}
                    max={MAX}
                    step={5}
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    aria-valuetext={`${minutes} 分鐘`}
                  />
                  <div className="relative h-4 mt-1">
                    {TICKS.map((t) => {
                      const tp = ((t - MIN) / (MAX - MIN)) * 100;
                      return (
                        <span
                          key={t}
                          className="absolute -translate-x-1/2 font-mono text-[11px] text-ink/45"
                          style={{ left: `${tp}%` }}
                        >
                          {t}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo text-paper font-display font-semibold text-lg py-3.5 border border-ink shadow-[3px_3px_0_0_#1C1B1F] hover:shadow-[1px_1px_0_0_#1C1B1F] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                送出預約 →
              </button>
            </form>
          )}

          {status === "submitted" && record && (
            <div className="py-2">
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink/60 mb-3">
                已收到
              </p>
              <p className="font-display text-xl leading-snug">
                @{record.instagram} · {record.minutes} 分鐘
              </p>
              <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                我們會透過 Instagram 私訊跟你確認時間。這個表單目前還沒接後端，
                資料只印在瀏覽器 console，之後可以接上 Google Sheet、Email 或
                Airtable。
              </p>
              <p className="mt-4 font-mono text-[11px] text-ink/45">
                這個瀏覽器今天已經預約過了，明天可以再填一次。
              </p>
            </div>
          )}

          {status === "locked" && record && (
            <div className="py-2">
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-coral mb-3">
                今天已經預約過了
              </p>
              <p className="font-display text-xl leading-snug">
                @{record.instagram} · {record.minutes} 分鐘
              </p>
              <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                這個瀏覽器今天已經送出過一次預約。想再填一次的話，
                請明天再回來，或是換一台裝置 / 瀏覽器。
              </p>
            </div>
          )}
        </div>

        <p className="text-center font-mono text-[11px] text-ink/40 mt-6">
          撕下票根，留個時間給自己
        </p>
      </div>
    </main>
  );
}
