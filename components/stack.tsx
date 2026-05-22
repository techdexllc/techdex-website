"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BRAND_LOGOS } from "@/lib/brand-logos";
import { SectionHead } from "./primitives";

const STACK = [
  { n: "Claude", t: "AI reasoning" },
  { n: "Anthropic", t: "Partner" },
  { n: "n8n", t: "Workflow engine" },
  { n: "Next.js", t: "App framework" },
  { n: "PostgreSQL", t: "Database" },
  { n: "tRPC", t: "API layer" },
  { n: "OpenAI", t: "Model API" },
  { n: "Vercel", t: "Edge" },
  { n: "Supabase", t: "BaaS" },
  { n: "Stripe", t: "Payments" },
  { n: "Prisma", t: "ORM" },
  { n: "Redis", t: "Cache" },
  { n: "Temporal", t: "Orchestration" },
  { n: "Linear", t: "Planning" },
  { n: "Figma", t: "Design" },
  { n: "TypeScript", t: "Language" },
  { n: "Tailwind CSS", t: "Styling" },
  { n: "Docker", t: "Runtime" },
  { n: "AWS", t: "Cloud" },
  { n: "GraphQL", t: "Query" },
  { n: "Playwright", t: "E2E" },
  { n: "Zapier", t: "Automation" },
  { n: "Clerk", t: "Auth" },
  { n: "Resend", t: "Email" },
  { n: "PostHog", t: "Analytics" },
  { n: "Sentry", t: "Observability" },
  { n: "GitHub", t: "Source" },
  { n: "Cloudflare", t: "Network" },
  { n: "Python", t: "Language" },
  { n: "LangChain", t: "Agent runtime" },
];

type DragState = { active: boolean; x: number; y: number; rotX: number; rotY: number };

function LogoGlobe() {
  const [mounted, setMounted] = useState(false);
  const [autoRot, setAutoRot] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [drag, setDrag] = useState<DragState>({
    active: false,
    x: 0,
    y: 0,
    rotX: -0.2,
    rotY: 0,
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setAutoRot((v) => v + dt * 0.15);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  const points = useMemo(() => {
    const N = STACK.length;
    const phi = Math.PI * (Math.sqrt(5) - 1);
    return STACK.map((s, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      return { ...s, x, y, z };
    });
  }, []);

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    const touch = "touches" in e ? e.touches[0] : null;
    const cx = touch ? touch.clientX : (e as React.MouseEvent).clientX;
    const cy = touch ? touch.clientY : (e as React.MouseEvent).clientY;
    setDrag((d) => ({ ...d, active: true, x: cx, y: cy }));
  };
  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drag.active) return;
    const touch = "touches" in e ? e.touches[0] : null;
    const cx = touch ? touch.clientX : (e as React.MouseEvent).clientX;
    const cy = touch ? touch.clientY : (e as React.MouseEvent).clientY;
    const dx = (cx - drag.x) / 200;
    const dy = (cy - drag.y) / 200;
    setDrag((d) => ({ ...d, rotY: d.rotY + dx, rotX: d.rotX - dy, x: cx, y: cy }));
  };

  useEffect(() => {
    const up = () => setDrag((d) => ({ ...d, active: false }));
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, []);

  const rotY = drag.rotY + autoRot;
  const rotX = drag.rotX;

  const size = 520;
  const R = size * 0.34;

  if (!mounted) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: size,
          aspectRatio: "1/1",
          margin: "0 auto",
        }}
      />
    );
  }

  const projected = points
    .map((p, i) => {
      let x = p.x * Math.cos(rotY) + p.z * Math.sin(rotY);
      let z = -p.x * Math.sin(rotY) + p.z * Math.cos(rotY);
      let y = p.y;
      const ny = y * Math.cos(rotX) - z * Math.sin(rotX);
      const nz = y * Math.sin(rotX) + z * Math.cos(rotX);
      y = ny;
      z = nz;
      const scale = 0.5 + (z + 1) * 0.35;
      const opacity = Math.max(0, (z + 1) / 2);
      return { ...p, i, px: x * R, py: y * R, z, scale, opacity };
    })
    .sort((a, b) => a.z - b.z);

  return (
    <div
      ref={ref}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onTouchStart={onDown}
      onTouchMove={onMove}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: size,
        aspectRatio: "1/1",
        margin: "0 auto",
        cursor: drag.active ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--accent) 18%, transparent), transparent 65%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />
      <svg
        viewBox={`-${size / 2} -${size / 2} ${size} ${size}`}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        aria-hidden
      >
        <ellipse
          cx="0"
          cy="0"
          rx={R}
          ry={R * Math.abs(Math.sin(rotX))}
          fill="none"
          stroke="var(--rule)"
          strokeWidth="0.5"
        />
        <circle cx="0" cy="0" r={R} fill="none" stroke="var(--rule)" strokeWidth="0.5" strokeDasharray="2 4" />
      </svg>

      {projected.map((p) => {
        const isHover = hover === p.i;
        const logo = BRAND_LOGOS[p.n];
        return (
          <div
            key={p.n}
            onMouseEnter={() => setHover(p.i)}
            onMouseLeave={() => setHover(null)}
            style={{
              position: "absolute",
              left: `calc(50% + ${p.px}px)`,
              top: `calc(50% + ${p.py}px)`,
              transform: `translate(-50%, -50%) scale(${p.scale})`,
              opacity: Math.pow(p.opacity, 1.4),
              pointerEvents: p.opacity > 0.35 ? "auto" : "none",
              transition: "opacity 0.15s",
              whiteSpace: "nowrap",
              zIndex: Math.round(p.z * 100) + 100,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 999,
                background: isHover ? "var(--accent)" : "var(--card)",
                color: isHover ? "var(--accent-ink)" : "var(--ink)",
                border: `1px solid ${isHover ? "var(--accent)" : "var(--rule-strong)"}`,
                fontSize: 13,
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                letterSpacing: "-0.005em",
                boxShadow: p.z > 0.6 ? "0 8px 24px -10px rgba(0,0,0,0.3)" : "none",
                transition: "background 0.2s, color 0.2s, border-color 0.2s",
              }}
            >
              {logo ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={isHover ? "var(--accent-ink)" : logo.c === "currentColor" ? "currentColor" : logo.c}
                  style={{ flexShrink: 0 }}
                  aria-hidden
                >
                  <path d={logo.p} />
                </svg>
              ) : (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: isHover ? "var(--accent-ink)" : "var(--accent)",
                  }}
                />
              )}
              {p.n}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Stack() {
  return (
    <section>
      <div className="container-tt">
        <div
          className="stack-wrap"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div>
            <SectionHead
              eyebrow="Stack"
              title={
                <>
                  Opinionated. <em style={{ fontStyle: "italic" }}>On purpose.</em>
                </>
              }
              sub="We pick tools we'd bet a weekend on. From Claude and n8n at the core to the supporting cast of infrastructure — every piece earns its place under real load."
            />
            <div style={{ marginTop: 40, display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div>
                <div className="serif" style={{ fontSize: 36, lineHeight: 1 }}>
                  28
                </div>
                <div className="mono" style={{ marginTop: 6 }}>
                  Tools in rotation
                </div>
              </div>
              <div style={{ width: 1, background: "var(--rule)" }} />
              <div>
                <div className="serif" style={{ fontSize: 36, lineHeight: 1 }}>
                  6
                </div>
                <div className="mono" style={{ marginTop: 6 }}>
                  Core defaults
                </div>
              </div>
              <div style={{ width: 1, background: "var(--rule)" }} />
              <div>
                <div className="serif" style={{ fontSize: 36, lineHeight: 1 }}>
                  0
                </div>
                <div className="mono" style={{ marginTop: 6 }}>
                  Sacred cows
                </div>
              </div>
            </div>
            <p className="mono" style={{ marginTop: 32, color: "var(--ink-4)" }}>
              Drag to rotate · hover for name
            </p>
          </div>
          <LogoGlobe />
        </div>
      </div>
    </section>
  );
}
