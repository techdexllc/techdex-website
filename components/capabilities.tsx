"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight, SectionHead } from "./primitives";

type Capability = {
  n: string;
  title: string;
  lede: string;
  deliverables: string[];
  metric: { v: string; l: string };
  sketch: "saas" | "erp" | "api" | "ai";
  featured?: boolean;
};

const CAPABILITIES: Capability[] = [
  {
    n: "01",
    title: "SaaS & MVP",
    lede: "Production-grade MVPs in 3–6 weeks. Not a prototype that needs rebuilding — a foundation that scales to Series A and beyond.",
    deliverables: ["Next.js · tRPC · Postgres", "Auth, billing, admin", "Analytics + experimentation", "Design system baked in"],
    metric: { v: "3.2w", l: "avg. to first paying user" },
    sketch: "saas",
  },
  {
    n: "02",
    title: "ERP",
    lede: "Bespoke operational software for companies that have outgrown spreadsheets and off-the-shelf rigidity.",
    deliverables: ["Inventory · orders · finance", "Role-based access", "Audit trails & reporting", "ETL from legacy systems"],
    metric: { v: "62%", l: "ops hours reclaimed" },
    sketch: "erp",
  },
  {
    n: "03",
    title: "API & Backend",
    lede: "Typed, tested, documented. The kind of backend your future engineers will thank you for.",
    deliverables: ["OpenAPI + SDK generation", "Event-driven architecture", "Observability by default", "Load-tested to 10k RPS"],
    metric: { v: "99.98%", l: "median uptime" },
    sketch: "api",
  },
  {
    n: "04",
    title: "AI & Automation",
    lede: "Claude-powered agents, n8n and Make workflows that eliminate repetitive work — measured in hours returned, not demo screenshots.",
    deliverables: ["Claude agents (tools + memory)", "n8n + Make orchestration", "Human-in-the-loop review", "Cost + latency monitoring"],
    metric: { v: "140h/mo", l: "typical hours saved" },
    sketch: "ai",
    featured: true,
  },
];

export function Capabilities({ variant = "brutalist" }: { variant?: "editorial" | "minimal" | "brutalist" }) {
  return (
    <section id="capabilities">
      <div className="container-tt">
        <SectionHead
          eyebrow="Capabilities"
          title={
            <>
              Four disciplines.<br />
              <em style={{ fontStyle: "italic", color: "var(--ink-3)" }}>One operating standard.</em>
            </>
          }
          sub="We only take work where senior engineers build end-to-end. No handoffs, no offshoring, no template factories."
        />
        <div
          className="cap-grid"
          style={{
            display: "grid",
            gridTemplateColumns: variant === "editorial" ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: variant === "editorial" ? 24 : 16,
            marginTop: 72,
          }}
        >
          {CAPABILITIES.map((c) => (
            <CapabilityCard key={c.n} cap={c} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({
  cap,
  variant,
}: {
  cap: Capability;
  variant: "editorial" | "minimal" | "brutalist";
}) {
  const [hover, setHover] = useState(false);
  const isEditorial = variant === "editorial";
  const isMinimal = variant === "minimal";
  const isBrutalist = variant === "brutalist";

  const baseCard: CSSProperties = {
    position: "relative",
    padding: isEditorial ? 40 : isMinimal ? 32 : 28,
    borderRadius: isBrutalist ? 0 : 14,
    background: cap.featured && isEditorial ? "var(--ink)" : "var(--card)",
    color: cap.featured && isEditorial ? "var(--bg)" : "var(--ink)",
    border: isBrutalist ? "1px solid var(--ink)" : "1px solid var(--rule)",
    minHeight: isEditorial ? 360 : 300,
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s cubic-bezier(0.2,0.7,0.2,1), border-color 0.2s, background 0.3s",
    transform: hover ? "translateY(-4px)" : "translateY(0)",
    overflow: "hidden",
    cursor: "pointer",
  };

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={baseCard}
      id="#capabilities"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <span
          className="mono"
          style={{ color: cap.featured && isEditorial ? "var(--ink-4)" : "var(--ink-3)" }}
        >
          {cap.n} / 04
        </span>
        <CapabilitySketch
          kind={cap.sketch}
          hover={hover}
          inverted={Boolean(cap.featured && isEditorial)}
        />
      </div>

      <h3
        className="display"
        style={{
          fontSize: isEditorial ? 44 : 32,
          margin: 0,
          marginBottom: 16,
          color: cap.featured && isEditorial ? "var(--accent)" : "inherit",
        }}
      >
        {cap.title}
      </h3>

      <p
        style={{
          fontSize: 15,
          lineHeight: 1.55,
          color: cap.featured && isEditorial ? "var(--ink-4)" : "var(--ink-3)",
          margin: 0,
          marginBottom: 28,
          maxWidth: 440,
        }}
      >
        {cap.lede}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: "auto" }}>
        {cap.deliverables.map((d, i) => (
          <div
            key={i}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              color: cap.featured && isEditorial ? "var(--ink-4)" : "var(--ink-3)",
              textTransform: "uppercase",
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <span style={{ width: 14, height: 1, background: "currentColor", opacity: 0.6 }} />
            {d}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 32,
          paddingTop: 24,
          borderTop: `1px solid ${cap.featured && isEditorial ? "rgba(245,242,234,0.15)" : "var(--rule)"}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <div className="serif" style={{ fontSize: 36, lineHeight: 1 }}>
            {cap.metric.v}
          </div>
          <div
            className="mono"
            style={{
              marginTop: 6,
              color: cap.featured && isEditorial ? "var(--ink-4)" : "var(--ink-3)",
            }}
          >
            {cap.metric.l}
          </div>
        </div>
        <a
          href="#contact"
          style={{
            display: "inline-flex",
            gap: 6,
            alignItems: "center",
            fontSize: 13,
            opacity: 0.85,
            transform: hover ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.3s",
          }}
        >
          Scope a project <ArrowUpRight />
        </a>
      </div>
    </article>
  );
}

function CapabilitySketch({
  kind,
  hover,
  inverted,
}: {
  kind: Capability["sketch"];
  hover: boolean;
  inverted: boolean;
}) {
  const stroke = inverted ? "var(--bg)" : "var(--ink)";
  const dim = inverted ? "var(--ink-4)" : "var(--ink-3)";
  const accent = "var(--accent)";
  const s = 56;
  const common: CSSProperties = { width: s, height: s, overflow: "visible" };

  if (kind === "saas") {
    return (
      <svg viewBox="0 0 56 56" style={common} aria-hidden>
        <rect x="4" y="8" width="48" height="36" rx="3" fill="none" stroke={stroke} strokeWidth="1" />
        <line x1="4" y1="16" x2="52" y2="16" stroke={dim} strokeWidth="0.5" />
        <circle cx="8" cy="12" r="1" fill={dim} />
        <circle cx="12" cy="12" r="1" fill={dim} />
        <circle cx="16" cy="12" r="1" fill={dim} />
        <rect
          x="8"
          y="20"
          width={hover ? 36 : 20}
          height="3"
          fill={accent}
          style={{ transition: "width 0.5s" }}
        />
        <rect x="8" y="26" width="28" height="2" fill={dim} />
        <rect x="8" y="30" width="22" height="2" fill={dim} />
        <rect x="8" y="36" width="14" height="4" fill={stroke} />
      </svg>
    );
  }
  if (kind === "erp") {
    return (
      <svg viewBox="0 0 56 56" style={common} aria-hidden>
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={6 + c * 12}
              y={6 + r * 12}
              width="10"
              height="10"
              fill={r === 1 && c === 2 ? accent : "none"}
              stroke={stroke}
              strokeWidth="0.5"
              style={{ transition: "fill 0.3s", transitionDelay: `${(r + c) * 50}ms` }}
            />
          ))
        )}
        {hover && (
          <rect
            x="6"
            y="6"
            width="46"
            height="46"
            fill="none"
            stroke={accent}
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />
        )}
      </svg>
    );
  }
  if (kind === "api") {
    return (
      <svg viewBox="0 0 56 56" style={common} aria-hidden>
        <circle cx="12" cy="28" r="4" fill={stroke} />
        <circle cx="44" cy="14" r="4" fill="none" stroke={stroke} strokeWidth="1" />
        <circle cx="44" cy="28" r="4" fill="none" stroke={stroke} strokeWidth="1" />
        <circle cx="44" cy="42" r="4" fill={accent} />
        <path d="M16 28 L40 14" stroke={dim} strokeWidth="0.6" />
        <path d="M16 28 L40 28" stroke={dim} strokeWidth="0.6" />
        <path
          d="M16 28 L40 42"
          stroke={hover ? accent : dim}
          strokeWidth={hover ? 1 : 0.6}
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 56 56" style={common} aria-hidden>
      <circle cx="28" cy="28" r="18" fill="none" stroke={stroke} strokeWidth="0.8" />
      <circle cx="28" cy="28" r="12" fill="none" stroke={dim} strokeWidth="0.5" strokeDasharray="2 2" />
      <circle cx="28" cy="28" r={hover ? 6 : 4} fill={accent} style={{ transition: "r 0.3s" }} />
      <circle cx="28" cy="10" r="2" fill={stroke} />
      <circle cx="46" cy="28" r="2" fill={stroke} />
      <circle cx="28" cy="46" r="2" fill={stroke} />
      <circle cx="10" cy="28" r="2" fill={stroke} />
    </svg>
  );
}
