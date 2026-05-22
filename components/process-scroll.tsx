"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const PS_BEATS = [
  { n: "01", w: "Week 0", t: "Diagnose", sub: "Chaos, in writing." },
  { n: "02", w: "Week 1", t: "Specify", sub: "A one-page contract." },
  { n: "03", w: "Week 2", t: "Architect", sub: "The shape of the system." },
  { n: "04", w: "Weeks 3–4", t: "Build", sub: "Senior engineers, weekly demos." },
  { n: "05", w: "Week 5+", t: "Ship", sub: "Live. Yours. Supported." },
];

const ease = (t: number) => t * t * (3 - 2 * t);
const win = (p: number, a: number, b: number) => Math.max(0, Math.min(1, (p - a) / (b - a)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function ProcessScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 860);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let raf = 0;
    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = -r.top;
      const total = r.height - vh;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) return <ProcessMobile />;

  const BEAT_BOUNDS = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
  let beatIdx = 0;
  for (let i = 0; i < 5; i++) {
    if (progress >= BEAT_BOUNDS[i] && progress < BEAT_BOUNDS[i + 1]) beatIdx = i;
  }
  if (progress >= 1) beatIdx = 4;

  return (
    <section id="process">
      <div ref={wrapRef} style={{ position: "relative", height: "520vh" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <div
            className="container-tt process-scroll-grid"
            style={{
              height: "100%",
              display: "grid",
              gridTemplateColumns: "0.8fr 1.2fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative" }}>
              <div className="eyebrow mono" style={{ marginBottom: 24 }}>
                <span className="dot" />
                <span>Our process, at scroll speed</span>
              </div>
              <h2
                className="display"
                style={{
                  fontSize: "clamp(40px, 4.6vw, 64px)",
                  margin: 0,
                  marginBottom: 24,
                  letterSpacing: "-0.02em",
                }}
              >
                From brief<br />
                to <em style={{ fontStyle: "italic", color: "var(--accent)" }}>production</em>,<br />
                visibly.
              </h2>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "var(--ink-3)",
                  margin: 0,
                  marginBottom: 40,
                  maxWidth: 420,
                }}
              >
                Scroll down. Each step is a real artefact we produce — not a metaphor. You&rsquo;ll see
                the same arc in every project we take on.
              </p>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {PS_BEATS.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "16px 0",
                      borderTop: i === 0 ? "1px solid var(--rule)" : "none",
                      borderBottom: "1px solid var(--rule)",
                      display: "grid",
                      gridTemplateColumns: "36px 72px 1fr",
                      gap: 14,
                      alignItems: "baseline",
                      opacity: beatIdx === i ? 1 : 0.3,
                      transition: "opacity 0.4s",
                    }}
                  >
                    <span
                      className="mono"
                      style={{ color: beatIdx === i ? "var(--accent)" : "var(--ink-4)" }}
                    >
                      {b.n}
                    </span>
                    <span className="mono">{b.w}</span>
                    <div>
                      <div
                        className="serif"
                        style={{ fontSize: 22, lineHeight: 1.1, color: "var(--ink)" }}
                      >
                        {b.t}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 3 }}>{b.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                height: "78vh",
                maxHeight: 720,
                border: "1px solid var(--rule)",
                borderRadius: 16,
                background: "var(--card)",
                overflow: "hidden",
              }}
            >
              <SceneStage progress={progress} />
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink-4)",
                  letterSpacing: "0.15em",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--accent)",
                  }}
                />
                FIG. 0{beatIdx + 1} · {PS_BEATS[beatIdx].t.toUpperCase()}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink-4)",
                  letterSpacing: "0.15em",
                }}
              >
                {Math.round(progress * 100).toString().padStart(3, "0")} / 100
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "var(--rule)",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progress * 100}%`,
                    background: "var(--accent)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SceneStage({ progress, compact }: { progress: number; compact?: boolean }) {
  const a = ease(1 - win(progress, 0.16, 0.22));
  const b = ease(win(progress, 0.16, 0.22)) * ease(1 - win(progress, 0.36, 0.42));
  const c = ease(win(progress, 0.36, 0.42)) * ease(1 - win(progress, 0.56, 0.62));
  const d = ease(win(progress, 0.56, 0.62)) * ease(1 - win(progress, 0.76, 0.82));
  const e = ease(win(progress, 0.76, 0.82));

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Scene opacity={a}>
        <SceneMess compact={compact} progress={win(progress, 0, 0.2)} />
      </Scene>
      <Scene opacity={b}>
        <SceneSpec compact={compact} progress={win(progress, 0.18, 0.4)} />
      </Scene>
      <Scene opacity={c}>
        <SceneArch compact={compact} progress={win(progress, 0.38, 0.6)} />
      </Scene>
      <Scene opacity={d}>
        <SceneCode compact={compact} progress={win(progress, 0.58, 0.8)} />
      </Scene>
      <Scene opacity={e}>
        <SceneShip compact={compact} progress={win(progress, 0.78, 1.0)} />
      </Scene>
    </div>
  );
}

function Scene({ opacity, children }: { opacity: number; children: ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        pointerEvents: opacity > 0.5 ? "auto" : "none",
        transition: "opacity 0.05s linear",
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SCENE 0 — Messy brief
// ---------------------------------------------------------------------------
type MessItem = {
  x: number;
  y: number;
  r: number;
  w: number;
  h: number;
  kind: "note" | "slack" | "email";
  text: string;
  tint: string;
};

const MESS_ITEMS: MessItem[] = [
  { x: 0.08, y: 0.18, r: -8, w: 160, h: 90, kind: "note", text: '"Ops team is drowning in spreadsheets"', tint: "#fbe47a" },
  { x: 0.62, y: 0.10, r: 6, w: 180, h: 100, kind: "note", text: "replace 3 legacy systems in Q2", tint: "#ffd4b8" },
  { x: 0.38, y: 0.34, r: -3, w: 220, h: 120, kind: "note", text: "needs Claude integration?\n+ human-in-loop review", tint: "#c9e4c5" },
  { x: 0.78, y: 0.42, r: 10, w: 150, h: 140, kind: "slack", text: "deadline May 15\nboard expects a demo", tint: "#fff" },
  { x: 0.08, y: 0.58, r: 4, w: 200, h: 110, kind: "note", text: "we've tried 2 agencies\nnothing to show", tint: "#d7c4f0" },
  { x: 0.52, y: 0.66, r: -6, w: 170, h: 100, kind: "note", text: "mobile? desktop?\nboth?", tint: "#fbe47a" },
  { x: 0.28, y: 0.80, r: 8, w: 190, h: 100, kind: "note", text: "$X budget, flexible\nif we trust you", tint: "#ffd4b8" },
  { x: 0.72, y: 0.78, r: -4, w: 160, h: 100, kind: "email", text: "from: cfo@\nsubject: urgent", tint: "#fff" },
];

function SceneMess({ progress, compact }: { progress: number; compact?: boolean }) {
  const scale = compact ? 0.55 : 1;
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }}
        aria-hidden
      >
        <defs>
          <pattern id="paper" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--rule)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#paper)" />
      </svg>
      {MESS_ITEMS.map((it, i) => {
        const cx = 0.5,
          cy = 0.5;
        const glide = Math.max(0, progress - 0.5) * 2;
        const w = it.w * scale,
          h = it.h * scale;
        const x = lerp(it.x, cx - w / 2 / 700, ease(glide));
        const y = lerp(it.y, cy - h / 2 / 500, ease(glide));
        const rot = lerp(it.r, 0, ease(glide));
        const sc = lerp(1, 0.6, ease(glide));
        const op = 1 - glide * 0.6;
        return (
          <StickyNote
            key={i}
            item={it}
            compact={compact}
            style={{
              left: `${x * 100}%`,
              top: `${y * 100}%`,
              transform: `rotate(${rot}deg) scale(${sc})`,
              opacity: op,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
          opacity: Math.max(0, progress - 0.3) * 2,
        }}
      >
        <div
          className="mono"
          style={{ color: "var(--ink-4)", fontSize: compact ? 9 : 11 }}
        >
          THE BRIEF COLLECTED
        </div>
        <div
          className="serif"
          style={{
            fontSize: compact ? 24 : 42,
            color: "var(--ink-2)",
            fontStyle: "italic",
          }}
        >
          &ldquo;Can you help?&rdquo;
        </div>
      </div>
    </div>
  );
}

function StickyNote({
  item,
  style,
  compact,
}: {
  item: MessItem;
  style: CSSProperties;
  compact?: boolean;
}) {
  const sc = compact ? 0.55 : 1;
  const base: CSSProperties = {
    position: "absolute",
    width: item.w * sc,
    height: item.h * sc,
    padding: compact ? "7px 9px" : "14px 16px",
    background: item.tint,
    boxShadow: "0 8px 24px -10px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.05)",
    fontFamily:
      item.kind === "slack" || item.kind === "email" ? "var(--font-mono)" : "var(--font-sans)",
    fontSize:
      item.kind === "slack" || item.kind === "email" ? (compact ? 8 : 11) : compact ? 9 : 13,
    color: "#222",
    lineHeight: 1.3,
    whiteSpace: "pre-line",
    transition: "transform 0.1s linear, opacity 0.1s linear",
    transformOrigin: "center",
    overflow: "hidden",
    ...style,
  };
  if (item.kind === "slack" || item.kind === "email") {
    return (
      <div style={base}>
        <div
          style={{
            fontSize: compact ? 6 : 8,
            color: "#888",
            letterSpacing: "0.15em",
            marginBottom: compact ? 3 : 6,
          }}
        >
          {item.kind === "slack" ? "# GENERAL" : "INBOX"}
        </div>
        {item.text}
      </div>
    );
  }
  return <div style={base}>{item.text}</div>;
}

// ---------------------------------------------------------------------------
// SCENE 1 — Typeset spec
// ---------------------------------------------------------------------------
function SceneSpec({ progress, compact }: { progress: number; compact?: boolean }) {
  const lines: { t: "h" | "s" | "h2" | "p"; text: string }[] = [
    { t: "h", text: "Technical Brief — v1.0" },
    { t: "s", text: "Prepared by TechDex · Week 1" },
    { t: "h2", text: "I.  Problem" },
    { t: "p", text: "Three legacy ops systems create daily spreadsheet reconciliation for the ops team. Dispatch, customs, and inventory data cannot be trusted in the same hour." },
    { t: "h2", text: "II.  Scope" },
    { t: "p", text: "One consolidated operator pane. Role-aware views. A Claude-assisted review loop for exceptions." },
    { t: "h2", text: "III. Constraints" },
    { t: "p", text: "22 working days to full cutover. No downtime. Historical data ETL without data loss." },
    { t: "h2", text: "IV. Proof of done" },
    { t: "p", text: "Week-three demo with three real operators. Week-five live cutover." },
  ];
  const revealed = Math.floor(progress * lines.length * 1.2);
  const pad = compact ? 20 : 40;
  const pagePad = compact ? "22px 20px" : "40px 44px";
  const sizeH = compact ? 18 : 28;
  const sizeP = compact ? 11 : 14;
  const sizeH2 = compact ? 10 : 14;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: pad,
      }}
    >
      <div
        style={{
          width: compact ? "100%" : "72%",
          maxWidth: 520,
          background: "var(--bg)",
          border: "1px solid var(--rule)",
          borderRadius: 6,
          padding: pagePad,
          fontFamily: "var(--font-serif)",
          boxShadow: "0 30px 60px -30px rgba(0,0,0,0.25)",
          transform: `scale(${lerp(0.9, 1, ease(Math.min(1, progress * 2)))})`,
          transformOrigin: "center",
        }}
      >
        <div
          className="mono"
          style={{
            fontSize: compact ? 8 : 9,
            color: "var(--ink-4)",
            letterSpacing: "0.2em",
            marginBottom: compact ? 12 : 20,
            paddingBottom: compact ? 8 : 12,
            borderBottom: "1px solid var(--rule)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>TECHDEX · CONFIDENTIAL</span>
          <span>REF 00471</span>
        </div>
        {lines.map((l, i) => {
          const show = i < revealed;
          const marginTop = l.t === "h2" ? (compact ? 12 : 18) : l.t === "h" ? 0 : 4;
          if (l.t === "h")
            return (
              <div
                key={i}
                style={{
                  fontSize: sizeH,
                  letterSpacing: "-0.01em",
                  color: "var(--ink)",
                  opacity: show ? 1 : 0,
                  transform: show ? "translateY(0)" : "translateY(4px)",
                  transition: "opacity 0.3s, transform 0.3s",
                  marginTop,
                  lineHeight: 1.1,
                }}
              >
                {l.text}
              </div>
            );
          if (l.t === "s")
            return (
              <div
                key={i}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: compact ? 8 : 10,
                  color: "var(--ink-4)",
                  letterSpacing: "0.15em",
                  marginTop: 4,
                  marginBottom: compact ? 8 : 12,
                  opacity: show ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              >
                {l.text}
              </div>
            );
          if (l.t === "h2")
            return (
              <div
                key={i}
                style={{
                  fontSize: sizeH2,
                  letterSpacing: "0.15em",
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                  opacity: show ? 1 : 0,
                  transform: show ? "translateY(0)" : "translateY(4px)",
                  transition: "opacity 0.3s, transform 0.3s",
                  marginTop,
                  marginBottom: compact ? 4 : 6,
                }}
              >
                {l.text}
              </div>
            );
          return (
            <p
              key={i}
              style={{
                margin: 0,
                marginTop,
                fontSize: sizeP,
                lineHeight: 1.5,
                color: "var(--ink-2)",
                opacity: show ? 1 : 0,
                transform: show ? "translateY(0)" : "translateY(4px)",
                transition: "opacity 0.3s, transform 0.3s",
              }}
            >
              {l.text}
            </p>
          );
        })}
        {revealed < lines.length && progress > 0.05 && (
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: compact ? 10 : 14,
              background: "var(--ink)",
              verticalAlign: "-2px",
              marginTop: 6,
              animation: "blink 1s infinite",
            }}
          />
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SCENE 2 — Architecture
// ---------------------------------------------------------------------------
type ArchNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tier: string;
  at: number;
  accent?: boolean;
};

function SceneArch({ progress }: { progress: number; compact?: boolean }) {
  const NODES: ArchNode[] = [
    { id: "client", label: "Operator Client", x: 0.15, y: 0.5, w: 140, h: 60, tier: "client", at: 0.02 },
    { id: "gw", label: "API Gateway", x: 0.42, y: 0.5, w: 120, h: 52, tier: "edge", at: 0.1 },
    { id: "auth", label: "Auth · RBAC", x: 0.42, y: 0.18, w: 120, h: 48, tier: "edge", at: 0.2 },
    { id: "svc1", label: "Dispatch svc", x: 0.68, y: 0.28, w: 130, h: 48, tier: "svc", at: 0.28 },
    { id: "svc2", label: "Customs svc", x: 0.68, y: 0.5, w: 130, h: 48, tier: "svc", at: 0.34 },
    { id: "svc3", label: "Inventory svc", x: 0.68, y: 0.72, w: 130, h: 48, tier: "svc", at: 0.4 },
    { id: "db", label: "Postgres", x: 0.88, y: 0.5, w: 100, h: 48, tier: "data", at: 0.5 },
    { id: "ai", label: "Claude · review loop", x: 0.42, y: 0.82, w: 180, h: 48, tier: "ai", accent: true, at: 0.58 },
    { id: "etl", label: "Legacy ETL", x: 0.15, y: 0.82, w: 120, h: 48, tier: "infra", at: 0.66 },
  ];
  const EDGES = [
    { a: "client", b: "gw", at: 0.12, dashed: false },
    { a: "gw", b: "auth", at: 0.22, dashed: false },
    { a: "gw", b: "svc1", at: 0.3, dashed: false },
    { a: "gw", b: "svc2", at: 0.36, dashed: false },
    { a: "gw", b: "svc3", at: 0.42, dashed: false },
    { a: "svc1", b: "db", at: 0.52, dashed: false },
    { a: "svc2", b: "db", at: 0.56, dashed: false },
    { a: "svc3", b: "db", at: 0.6, dashed: false },
    { a: "svc2", b: "ai", at: 0.68, dashed: true },
    { a: "etl", b: "db", at: 0.74, dashed: true },
  ];

  const W = 700,
    H = 460;
  const px = (n: ArchNode) => n.x * W;
  const py = (n: ArchNode) => n.y * H;
  const findNode = (id: string) => NODES.find((n) => n.id === id)!;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "92%", height: "88%" }}
      >
        <g opacity="0.5">
          {(["Client", "Edge", "Services", "Data"] as const).map((t, i) => (
            <text
              key={i}
              x={[0.1, 0.34, 0.6, 0.8][i] * W}
              y={26}
              fontFamily="var(--font-mono)"
              fontSize="9"
              fill="var(--ink-4)"
              letterSpacing="0.15em"
              textAnchor="start"
            >
              {t.toUpperCase()}
            </text>
          ))}
        </g>
        <g opacity="0.2">
          {[0.3, 0.55, 0.78].map((xr, i) => (
            <line
              key={i}
              x1={xr * W}
              y1={32}
              x2={xr * W}
              y2={H - 16}
              stroke="var(--rule)"
              strokeDasharray="2 4"
            />
          ))}
        </g>

        {EDGES.map((e, i) => {
          if (progress < e.at) return null;
          const a = findNode(e.a);
          const b = findNode(e.b);
          const reveal = Math.min(1, (progress - e.at) * 6);
          const x1 = px(a),
            y1 = py(a),
            x2 = px(b),
            y2 = py(b);
          const mx = (x1 + x2) / 2;
          const path = `M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
          return (
            <path
              key={i}
              d={path}
              fill="none"
              stroke={e.dashed ? "var(--accent)" : "var(--ink-3)"}
              strokeWidth={e.dashed ? 1.1 : 0.9}
              strokeDasharray={e.dashed ? "3 3" : undefined}
              pathLength={1}
              strokeDashoffset={e.dashed ? 0 : 1 - reveal}
              style={!e.dashed ? { strokeDasharray: 1, strokeDashoffset: 1 - reveal } : undefined}
              opacity={e.dashed ? reveal : 1}
            />
          );
        })}

        {NODES.map((n) => {
          if (progress < n.at) return null;
          const r = Math.min(1, (progress - n.at) * 8);
          const scale = lerp(0.8, 1, ease(r));
          return (
            <g key={n.id} opacity={r}>
              <rect
                x={px(n) - n.w / 2}
                y={py(n) - n.h / 2}
                width={n.w}
                height={n.h}
                rx="6"
                fill={n.accent ? "color-mix(in oklch, var(--accent) 12%, var(--card))" : "var(--card)"}
                stroke={n.accent ? "var(--accent)" : "var(--ink-3)"}
                strokeWidth={n.accent ? 1.2 : 0.9}
                style={{ transform: `scale(${scale})`, transformOrigin: `${px(n)}px ${py(n)}px` }}
              />
              <text
                x={px(n)}
                y={py(n) + 4}
                textAnchor="middle"
                fontFamily="var(--font-sans)"
                fontSize="12"
                fill={n.accent ? "var(--accent)" : "var(--ink)"}
                fontWeight="500"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SCENE 3 — Code + tests
// ---------------------------------------------------------------------------
const CODE_LINES: { t: "c" | "k" | "n"; text: string; rest?: string }[] = [
  { t: "c", text: "// dispatch/service.ts" },
  { t: "k", text: "export async function", rest: " assignLoad(load: Load) {" },
  { t: "n", text: "  const operator = await pickOperator(load);" },
  { t: "n", text: "  const plan     = await planner.solve(load, operator);" },
  { t: "n", text: "  if (plan.confidence < 0.9) {" },
  { t: "n", text: "    return reviewQueue.push({ load, plan });" },
  { t: "n", text: "  }" },
  { t: "n", text: '  return bus.publish("load.assigned", plan);' },
  { t: "n", text: "}" },
];
const TESTS = [
  { name: "picks operator by capacity", ms: 12, ok: true },
  { name: "respects region preference", ms: 18, ok: true },
  { name: "routes low-confidence to review", ms: 8, ok: true },
  { name: "publishes assignment event", ms: 21, ok: true },
  { name: "retries on bus error", ms: 44, ok: true },
];

function SceneCode({ progress, compact }: { progress: number; compact?: boolean }) {
  const typed = Math.floor(progress * (CODE_LINES.length + TESTS.length + 3));
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: compact ? "1fr" : "1.4fr 1fr",
        gridTemplateRows: compact ? "1.3fr 1fr" : "1fr",
        gap: compact ? 10 : 20,
        padding: compact ? "34px 14px 14px" : "48px 28px 28px",
      }}
    >
      <div
        style={{
          background: "var(--bg-elev)",
          border: "1px solid var(--rule)",
          borderRadius: 10,
          overflow: "hidden",
          fontFamily: "var(--font-mono)",
          fontSize: compact ? 10 : 13,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <div
          style={{
            padding: compact ? "6px 10px" : "10px 14px",
            borderBottom: "1px solid var(--rule)",
            display: "flex",
            justifyContent: "space-between",
            fontSize: compact ? 8 : 10,
            color: "var(--ink-4)",
            letterSpacing: "0.15em",
          }}
        >
          <span>SERVICE.TS</span>
          <span style={{ color: "var(--accent)" }}>●  EDITING</span>
        </div>
        <div style={{ padding: compact ? "10px 12px" : "16px 20px", flex: 1, overflow: "hidden" }}>
          {CODE_LINES.map((ln, i) => {
            if (i > typed) return null;
            const rev = Math.min(1, (typed - i) * 2);
            const color =
              ln.t === "c" ? "var(--ink-4)" : ln.t === "k" ? "var(--accent)" : "var(--ink-2)";
            return (
              <div
                key={i}
                style={{
                  color,
                  opacity: rev,
                  transform: `translateY(${(1 - rev) * 4}px)`,
                  transition: "opacity 0.2s, transform 0.2s",
                  lineHeight: compact ? 1.5 : 1.7,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span
                  style={{
                    color: "var(--ink-4)",
                    marginRight: compact ? 8 : 14,
                    userSelect: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {ln.rest ? (
                  <>
                    <span style={{ color: "var(--accent)" }}>{ln.text}</span>
                    <span style={{ color: "var(--ink)" }}>{ln.rest}</span>
                  </>
                ) : (
                  ln.text
                )}
              </div>
            );
          })}
          {typed >= CODE_LINES.length - 1 && (
            <div
              style={{
                color: "var(--ink-4)",
                marginTop: 8,
                fontSize: compact ? 9 : 11,
              }}
            >
              {">"} saved · LSP ok · running tests…
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--rule)",
          borderRadius: 10,
          overflow: "hidden",
          fontFamily: "var(--font-mono)",
          fontSize: compact ? 10 : 12,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <div
          style={{
            padding: compact ? "6px 10px" : "10px 14px",
            borderBottom: "1px solid var(--rule)",
            fontSize: compact ? 8 : 10,
            color: "var(--ink-4)",
            letterSpacing: "0.15em",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>TEST SUITE</span>
          <span>vitest · watch</span>
        </div>
        <div
          style={{
            padding: compact ? "8px 12px" : "16px 18px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: compact ? 3 : 6,
            overflow: "hidden",
          }}
        >
          {TESTS.map((t, i) => {
            const idx = CODE_LINES.length + i;
            if (typed < idx) return null;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: compact ? 6 : 10,
                  alignItems: "baseline",
                  color: "var(--ink-2)",
                  animation: "fadeUp 0.3s both",
                }}
              >
                <span style={{ color: "var(--accent)", fontSize: compact ? 11 : 13 }}>✓</span>
                <span
                  style={{
                    flex: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t.name}
                </span>
                <span style={{ color: "var(--ink-4)", fontSize: compact ? 8 : 10 }}>{t.ms}ms</span>
              </div>
            );
          })}
          {typed >= CODE_LINES.length + TESTS.length && (
            <div
              style={{
                marginTop: compact ? 6 : 14,
                paddingTop: compact ? 6 : 12,
                borderTop: "1px solid var(--rule)",
                color: "var(--accent)",
                fontSize: compact ? 9 : 11,
                letterSpacing: "0.05em",
              }}
            >
              {TESTS.length} passed · 0 failed · {TESTS.reduce((a, b) => a + b.ms, 0)}ms
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SCENE 4 — Ship
// ---------------------------------------------------------------------------
function SceneShip({ progress, compact }: { progress: number; compact?: boolean }) {
  const scale = lerp(0.85, 1, ease(Math.min(1, progress * 2)));
  const counter = Math.floor(lerp(47, 48, ease(Math.min(1, (progress - 0.3) * 3))));
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: compact ? 14 : 24,
        padding: compact ? 22 : 40,
        paddingTop: compact ? 34 : 40,
      }}
    >
      <div
        style={{
          width: compact ? "92%" : "80%",
          maxWidth: 560,
          aspectRatio: "16/10",
          background: "var(--bg-elev)",
          border: "1px solid var(--rule-strong)",
          borderRadius: compact ? 8 : 12,
          overflow: "hidden",
          boxShadow: "0 40px 80px -40px rgba(0,0,0,0.3)",
          transform: `scale(${scale})`,
          position: "relative",
        }}
      >
        <div
          style={{
            padding: compact ? "6px 8px" : "8px 12px",
            borderBottom: "1px solid var(--rule)",
            display: "flex",
            alignItems: "center",
            gap: compact ? 5 : 8,
          }}
        >
          <span
            style={{
              width: compact ? 6 : 8,
              height: compact ? 6 : 8,
              borderRadius: "50%",
              background: "#e36044",
            }}
          />
          <span
            style={{
              width: compact ? 6 : 8,
              height: compact ? 6 : 8,
              borderRadius: "50%",
              background: "#e5b944",
            }}
          />
          <span
            style={{
              width: compact ? 6 : 8,
              height: compact ? 6 : 8,
              borderRadius: "50%",
              background: "#5bbf6c",
            }}
          />
          <div
            style={{
              marginLeft: compact ? 8 : 12,
              padding: compact ? "2px 6px" : "4px 10px",
              borderRadius: 4,
              background: "var(--card)",
              border: "1px solid var(--rule)",
              fontFamily: "var(--font-mono)",
              fontSize: compact ? 8 : 10,
              color: "var(--ink-3)",
              flex: 1,
              maxWidth: 220,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            meridian-ops.internal
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: compact ? "70px 1fr" : "140px 1fr",
            height: `calc(100% - ${compact ? 20 : 28}px)`,
          }}
        >
          <div
            style={{
              borderRight: "1px solid var(--rule)",
              padding: compact ? 6 : 12,
              display: "flex",
              flexDirection: "column",
              gap: compact ? 3 : 8,
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: compact ? 6 : 8,
                color: "var(--ink-4)",
                letterSpacing: "0.15em",
              }}
            >
              MERIDIAN
            </div>
            {["Dispatch", "Customs", "Inventory", "Review"].map((s, i) => (
              <div
                key={i}
                style={{
                  fontSize: compact ? 8 : 11,
                  padding: compact ? "3px 5px" : "6px 8px",
                  borderRadius: 3,
                  background: i === 0 ? "var(--accent)" : "transparent",
                  color: i === 0 ? "var(--accent-ink)" : "var(--ink-2)",
                }}
              >
                {s}
              </div>
            ))}
          </div>
          <div
            style={{
              padding: compact ? 8 : 16,
              display: "flex",
              flexDirection: "column",
              gap: compact ? 4 : 8,
            }}
          >
            <div
              style={{
                height: compact ? 16 : 28,
                background: "var(--card)",
                borderRadius: 3,
                border: "1px solid var(--rule)",
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: compact ? 4 : 8,
                height: compact ? 32 : 60,
              }}
            >
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: 3,
                  border: "1px solid var(--rule)",
                }}
              />
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: 3,
                  border: "1px solid var(--rule)",
                }}
              />
              <div
                style={{
                  background: "color-mix(in oklch, var(--accent) 18%, var(--card))",
                  borderRadius: 3,
                  border: "1px solid var(--accent)",
                }}
              />
            </div>
            {Array.from({ length: compact ? 3 : 5 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: compact ? 10 : 18,
                  background: "var(--card)",
                  borderRadius: 2,
                  border: "1px solid var(--rule)",
                  opacity: 1 - i * 0.15,
                }}
              />
            ))}
          </div>
        </div>
        {progress > 0.25 && (
          <div
            style={{
              position: "absolute",
              top: "40%",
              right: compact ? 12 : 24,
              transform: `rotate(-14deg) scale(${ease(Math.min(1, (progress - 0.25) * 4))})`,
              border: compact ? "2px solid var(--accent)" : "3px solid var(--accent)",
              padding: compact ? "5px 10px" : "10px 20px",
              borderRadius: compact ? 4 : 8,
              fontFamily: "var(--font-mono)",
              fontSize: compact ? 9 : 14,
              fontWeight: 700,
              color: "var(--accent)",
              letterSpacing: "0.2em",
              background: "color-mix(in oklch, var(--bg) 92%, transparent)",
            }}
          >
            DEPLOYED
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: compact ? 8 : 14,
          opacity: ease(Math.min(1, (progress - 0.4) * 3)),
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span
          className="display"
          style={{
            fontSize: compact ? 36 : 64,
            lineHeight: 1,
            color: "var(--accent)",
          }}
        >
          {counter}
        </span>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: compact ? 13 : 22,
            color: "var(--ink-2)",
          }}
        >
          products shipped. And counting.
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MOBILE
// ---------------------------------------------------------------------------
function ProcessMobile() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [userInteracting, setUserInteracting] = useState(false);
  const [sectionSeen, setSectionSeen] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.35) setSectionSeen(true);
        }
      },
      { threshold: [0, 0.35, 0.6] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best && best.intersectionRatio > 0.6) {
          const i = Number((best.target as HTMLElement).dataset.idx);
          setActiveIdx(i);
        }
      },
      { root, threshold: [0.4, 0.6, 0.8, 1] }
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const onInteract = () => {
      setUserInteracting(true);
      if (t) clearTimeout(t);
      t = setTimeout(() => setUserInteracting(false), 2500);
    };
    root.addEventListener("touchstart", onInteract, { passive: true });
    root.addEventListener("pointerdown", onInteract, { passive: true });
    root.addEventListener("wheel", onInteract, { passive: true });
    return () => {
      root.removeEventListener("touchstart", onInteract);
      root.removeEventListener("pointerdown", onInteract);
      root.removeEventListener("wheel", onInteract);
      if (t) clearTimeout(t);
    };
  }, []);

  const goTo = (i: number) => {
    const root = scrollerRef.current;
    const card = cardRefs.current[i];
    if (!root || !card) return;
    root.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  const onSceneComplete = (i: number) => {
    if (userInteracting) return;
    if (i < PS_BEATS.length - 1) {
      setTimeout(() => {
        if (!userInteracting) goTo(i + 1);
      }, 1400);
    }
  };

  return (
    <section ref={sectionRef} id="process">
      <div className="container-tt" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div style={{ padding: "0 24px" }}>
          <div className="eyebrow mono" style={{ marginBottom: 24 }}>
            <span className="dot" />
            <span>Our process</span>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(36px, 9vw, 56px)",
              margin: 0,
              marginBottom: 16,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
            }}
          >
            From brief to <em style={{ fontStyle: "italic", color: "var(--accent)" }}>production</em>,
            <br />
            visibly.
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.5,
              color: "var(--ink-3)",
              margin: 0,
              marginBottom: 24,
            }}
          >
            Swipe through each step — these are real artefacts we produce, not metaphors.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 6, flex: 1 }}>
              {PS_BEATS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Step ${i + 1}`}
                  style={{
                    flex: 1,
                    height: 3,
                    background: i <= activeIdx ? "var(--accent)" : "var(--rule-strong)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>
            <span
              className="mono"
              style={{
                color: "var(--ink-3)",
                fontSize: 11,
                minWidth: 40,
                textAlign: "right",
              }}
            >
              {String(activeIdx + 1).padStart(2, "0")} / {String(PS_BEATS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="ps-mobile-scroller"
          style={{
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            gap: 12,
            padding: "8px 24px 24px",
            scrollPaddingLeft: 24,
          }}
        >
          {PS_BEATS.map((beat, i) => (
            <MobileCard
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              beat={beat}
              index={i}
              isActive={i === activeIdx && sectionSeen}
              onComplete={() => onSceneComplete(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type BeatType = (typeof PS_BEATS)[number];

const MobileCard = forwardRef<
  HTMLDivElement,
  { beat: BeatType; index: number; isActive: boolean; onComplete: () => void }
>(function MobileCard({ beat, index, isActive, onComplete }, ref) {
  const [progress, setProgress] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    if (hasPlayed && progress >= 1) return;
    let raf = 0;
    const dur = 2000;
    const start = performance.now();
    const from = hasPlayed ? 1 : 0;
    if (from >= 1) {
      setProgress(1);
      return;
    }
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setProgress(t);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setHasPlayed(true);
        onComplete && onComplete();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const SceneByIdx = [SceneMess, SceneSpec, SceneArch, SceneCode, SceneShip][index];

  return (
    <div
      ref={ref}
      data-idx={index}
      style={{
        flex: "0 0 calc(100vw - 48px)",
        maxWidth: 440,
        scrollSnapAlign: "center",
        scrollSnapStop: "always",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          marginBottom: 10,
          minHeight: 22,
        }}
      >
        <span className="mono" style={{ color: "var(--accent)", fontSize: 11 }}>
          {beat.n}
        </span>
        <span className="mono" style={{ fontSize: 11 }}>
          {beat.w}
        </span>
      </div>
      <div
        className="serif"
        style={{
          fontSize: 32,
          lineHeight: 1.05,
          letterSpacing: "-0.015em",
          marginBottom: 4,
        }}
      >
        {beat.t}
      </div>
      <div style={{ fontSize: 14, color: "var(--ink-3)", marginBottom: 14, minHeight: 20 }}>
        {beat.sub}
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "3 / 4",
          maxHeight: 540,
          border: "1px solid var(--rule)",
          borderRadius: 14,
          background: "var(--card)",
          overflow: "hidden",
        }}
      >
        <SceneByIdx progress={progress} compact />
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 9,
            fontFamily: "var(--font-mono)",
            color: "var(--ink-4)",
            letterSpacing: "0.15em",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: isActive ? "var(--accent)" : "var(--ink-4)",
              transition: "background 0.3s",
            }}
          />
          FIG. 0{index + 1}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "var(--rule)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: "var(--accent)",
              transition: "width 0.05s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
});
