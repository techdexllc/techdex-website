"use client";

import { useEffect, useState } from "react";

type Testimonial = {
  q: string;
  a: string;
  r: string;
  metric: { v: string; l: string };
  hue: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    q: "They replaced an agency that had billed us for nine months with nothing to show. Shipped our MVP in four weeks, and it closed our seed round.",
    a: "Priya Shah",
    r: "CEO, Fieldstone Labs",
    metric: { v: "$9M", l: "Series A closed" },
    hue: "#c6371e",
  },
  {
    q: "The first firm we've worked with that genuinely understands both the technology and the business we run. Rare combination, honestly.",
    a: "Marcus Allen",
    r: "COO, Meridian Freight",
    metric: { v: "68%", l: "ops hours reclaimed" },
    hue: "#2a6f4f",
  },
  {
    q: "Their Claude + n8n stack automated the single biggest cost center in our business. ROI in six weeks — not six quarters.",
    a: "Dr. Elena Vos",
    r: "Founder, Hyphen AI",
    metric: { v: "6w", l: "to full ROI" },
    hue: "#6a4fd0",
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (paused) return;
    let raf = 0;
    let start = performance.now();
    const dur = 7000;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setProgress(p);
      if (p >= 1) {
        setIdx((i) => (i + 1) % TESTIMONIALS.length);
        start = now;
        setProgress(0);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, idx]);

  const jump = (i: number) => {
    setIdx(i);
    setProgress(0);
  };

  const t = TESTIMONIALS[idx];

  return (
    <section onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container-tt">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 56,
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div className="eyebrow mono" style={{ marginBottom: 20 }}>
              <span className="dot" />
              <span>What clients say</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 5vw, 72px)", margin: 0 }}>
              <em style={{ fontStyle: "italic" }}>Hire senior.</em> Once.
            </h2>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <ArrowButton
              direction="prev"
              onClick={() => jump((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            />
            <ArrowButton direction="next" onClick={() => jump((idx + 1) % TESTIMONIALS.length)} />
          </div>
        </div>

        <div
          style={{
            position: "relative",
            border: "1px solid var(--rule)",
            borderRadius: 20,
            background: "var(--card)",
            overflow: "hidden",
            minHeight: 460,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: t.hue,
              transition: "background 0.6s",
            }}
          />

          <div
            className="testimonial-carousel"
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr",
              minHeight: 460,
            }}
          >
            <div
              style={{
                padding: "56px 56px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 32,
                  }}
                >
                  <span className="mono">
                    {String(idx + 1).padStart(2, "0")} /{" "}
                    {String(TESTIMONIALS.length).padStart(2, "0")}
                  </span>
                  <span style={{ flex: 1, height: 1, background: "var(--rule)" }} />
                  <span
                    className="mono"
                    style={{ color: t.hue, transition: "color 0.6s" }}
                  >
                    {t.r.split(", ")[1]?.toUpperCase()}
                  </span>
                </div>
                <blockquote
                  key={idx}
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(24px, 2.6vw, 38px)",
                    lineHeight: 1.25,
                    color: "var(--ink)",
                    letterSpacing: "-0.015em",
                    animation: "fadeUp 0.6s cubic-bezier(0.2,0.7,0.2,1) both",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.4em",
                      color: t.hue,
                      marginRight: 6,
                      verticalAlign: "-0.1em",
                      transition: "color 0.6s",
                    }}
                  >
                    &ldquo;
                  </span>
                  {t.q}
                </blockquote>
              </div>

              <figcaption
                key={"cap-" + idx}
                style={{
                  marginTop: 40,
                  paddingTop: 24,
                  borderTop: "1px solid var(--rule)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  animation: "fadeUp 0.6s 0.1s cubic-bezier(0.2,0.7,0.2,1) both",
                }}
              >
                <Avatar name={t.a} hue={t.hue} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{t.a}</div>
                  <div className="mono" style={{ marginTop: 4 }}>
                    {t.r}
                  </div>
                </div>
              </figcaption>
            </div>

            <div
              style={{
                padding: 40,
                borderLeft: "1px solid var(--rule)",
                background: `color-mix(in oklch, ${t.hue} 8%, var(--card))`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "background 0.6s",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <svg
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0.15,
                  pointerEvents: "none",
                }}
                aria-hidden
              >
                <defs>
                  <pattern id="tgrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path
                      d="M 24 0 L 0 0 0 24"
                      fill="none"
                      stroke={t.hue}
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#tgrid)" />
              </svg>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="mono" style={{ color: t.hue, transition: "color 0.6s" }}>
                  Outcome
                </div>
              </div>
              <div
                key={"m-" + idx}
                style={{
                  position: "relative",
                  zIndex: 1,
                  animation: "fadeUp 0.6s 0.15s cubic-bezier(0.2,0.7,0.2,1) both",
                }}
              >
                <div
                  className="display"
                  style={{
                    fontSize: "clamp(72px, 9vw, 128px)",
                    lineHeight: 0.95,
                    color: t.hue,
                    marginBottom: 16,
                    transition: "color 0.6s",
                  }}
                >
                  {t.metric.v}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: "var(--ink-2)",
                    maxWidth: 280,
                    lineHeight: 1.35,
                  }}
                >
                  {t.metric.l}
                </div>
              </div>
              <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 6 }}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => jump(i)}
                    aria-label={`Quote ${i + 1}`}
                    style={{
                      flex: 1,
                      height: 2,
                      background: "var(--rule-strong)",
                      position: "relative",
                      overflow: "hidden",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: i < idx ? "100%" : i === idx ? `${progress * 100}%` : "0%",
                        background: t.hue,
                        transition: i === idx ? "none" : "width 0.3s, background 0.6s",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1px solid var(--rule-strong)",
        background: "transparent",
        color: "var(--ink)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s, color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--ink)";
        e.currentTarget.style.color = "var(--bg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--ink)";
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16">
        <path
          d={direction === "prev" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function Avatar({ name, hue }: { name: string; hue: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${hue}, color-mix(in oklch, ${hue} 50%, var(--ink)))`,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-serif)",
        fontSize: 18,
        letterSpacing: "0.02em",
        flexShrink: 0,
        transition: "background 0.6s",
      }}
    >
      {initials}
    </div>
  );
}
