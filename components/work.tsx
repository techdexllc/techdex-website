"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight, SectionHead } from "./primitives";

type WorkItem = {
  client: string;
  tag: string;
  year: string;
  title: string;
  hero: { v: string; u: string; l: string };
  aside: [string, string][];
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  diagram: "saas" | "erp" | "ai";
  tintAccent?: boolean;
};

const WORK: WorkItem[] = [
  {
    client: "Fieldstone Labs",
    tag: "SaaS · Seed · Biotech",
    year: "Q2 2025",
    title: "Specimen tracking for 140 wet-lab researchers.",
    hero: { v: "12", u: "weeks", l: "Concept to first paying lab" },
    aside: [
      ["$9M", "Series A"],
      ["320%", "YoY retention"],
      ["140", "active users"],
    ],
    problem:
      "A lead biologist was losing samples in spreadsheets. Existing LIMS tools required six-month implementations and six-figure licences before a single test tube was scanned.",
    approach:
      "We built a narrow, opinionated LIMS around barcode scanning, freezer-location mapping, and Claude-powered protocol summarisation. Shipped weekly to three pilot labs in parallel.",
    outcome:
      "Zero-to-revenue in 12 weeks. Closed $9M Series A three months after launch with this product as the primary asset.",
    stack: ["Next.js", "Postgres", "tRPC", "Claude", "Resend"],
    diagram: "saas",
    tintAccent: true,
  },
  {
    client: "Meridian Freight",
    tag: "ERP · Mid-market · Logistics",
    year: "Q4 2024",
    title: "One operator pane, three retired legacy systems.",
    hero: { v: "68", u: "%", l: "Operational hours reclaimed" },
    aside: [
      ["22", "days to cutover"],
      ["4.9 / 5", "operator NPS"],
      ["3 → 1", "systems consolidated"],
    ],
    problem:
      "Dispatch, customs, and inventory each lived in a different vendor system. Operators spent their mornings reconciling spreadsheets between them instead of moving freight.",
    approach:
      "Modelled the real operational workflow first, then the schema. Built a single ERP with role-aware views and audit trails. ETL'd ten years of historical data without downtime.",
    outcome:
      "Operators gave up their old tools voluntarily by week three. Ops hours reclaimed now fund a second customer-success hire.",
    stack: ["Next.js", "Postgres", "Temporal", "n8n", "Docker"],
    diagram: "erp",
  },
  {
    client: "Hyphen AI",
    tag: "AI · Agents · Legal",
    year: "Q1 2025",
    title: "A Claude paralegal reviewing 400-page contracts.",
    hero: { v: "90", u: "sec", l: "Median review time, cite-backed" },
    aside: [
      ["92%", "reviewer agreement"],
      ["$42", "avg. cost per doc"],
      ["11s", "p50 latency"],
    ],
    problem:
      "Junior associates were the bottleneck for contract review at a 200-lawyer firm — slow, expensive, and inconsistent. LLM pilots had hallucinated their way out of trust.",
    approach:
      "Agent pipeline with retrieval over clause libraries, deterministic cite-back, and human-in-the-loop review. Every output links to the exact span it came from. No invented citations, ever.",
    outcome:
      "Now reviews 60% of inbound contracts before a human ever opens the document. Reviewer agreement with the agent clocks in at 92%.",
    stack: ["Claude", "LangGraph", "Postgres", "Next.js", "Sentry"],
    diagram: "ai",
  },
];

export function Work() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="work">
      <div className="container-tt">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 56,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <SectionHead
            eyebrow="Case dossier"
            title={
              <>
                Three out of <em style={{ fontStyle: "italic" }}>forty-seven</em>.
              </>
            }
            sub="Most of what we ship is under NDA. These three let us talk in public. Expand any file for the short-form account."
          />
          <a href="#" className="btn">
            Request full index <ArrowUpRight />
          </a>
        </div>

        <div
          className="work-masthead"
          style={{
            display: "grid",
            gridTemplateColumns: "64px 1.6fr 1.4fr 1fr 32px",
            gap: 24,
            padding: "16px 0",
            borderBottom: "1px solid var(--rule-strong)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.15em",
            color: "var(--ink-4)",
            textTransform: "uppercase",
          }}
        >
          <span>№</span>
          <span>Client / Discipline</span>
          <span>Outcome</span>
          <span style={{ textAlign: "right" }}>Hero metric</span>
          <span />
        </div>

        <div>
          {WORK.map((w, i) => (
            <WorkDossier
              key={i}
              work={w}
              index={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkDossier({
  work,
  index,
  open,
  onToggle,
}: {
  work: WorkItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderBottom: "1px solid var(--rule)",
        position: "relative",
        transition: "background 0.3s",
        background: hover && !open ? "color-mix(in oklch, var(--accent) 3%, transparent)" : "transparent",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: "inherit",
          textAlign: "left",
          fontFamily: "inherit",
        }}
      >
        <div
          className="work-row-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "64px 1.6fr 1.4fr 1fr 32px",
            gap: 24,
            padding: "36px 0",
            alignItems: "center",
          }}
        >
          <span className="mono" style={{ fontSize: 13, color: "var(--ink-3)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            <div
              className="serif"
              style={{
                fontSize: 30,
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                transition: "color 0.3s",
                color: hover ? "var(--accent)" : "var(--ink)",
              }}
            >
              {work.client}
            </div>
            <div className="mono" style={{ marginTop: 8 }}>
              {work.tag} · {work.year}
            </div>
          </div>

          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 22,
              lineHeight: 1.3,
              color: "var(--ink-2)",
              margin: 0,
              maxWidth: 480,
              letterSpacing: "-0.01em",
            }}
          >
            {work.title}
          </p>

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "flex-end",
                gap: 4,
              }}
            >
              <span
                className="display"
                style={{
                  fontSize: 52,
                  lineHeight: 1,
                  color: work.tintAccent ? "var(--accent)" : "var(--ink)",
                }}
              >
                {work.hero.v}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  color: "var(--ink-3)",
                }}
              >
                {work.hero.u}
              </span>
            </div>
            <div className="mono" style={{ marginTop: 6, fontSize: 10 }}>
              {work.hero.l}
            </div>
          </div>

          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid var(--rule-strong)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              justifySelf: "end",
              transition:
                "transform 0.4s cubic-bezier(0.2,0.7,0.2,1), background 0.3s, color 0.3s",
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              background: open ? "var(--ink)" : "transparent",
              color: open ? "var(--bg)" : "var(--ink-3)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
              <path
                d="M6 2v8M2 6h8"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.5s cubic-bezier(0.2,0.7,0.2,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            className="work-expand-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr",
              gap: 56,
              padding: "12px 0 56px",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 0.4s 0.1s, transform 0.4s 0.1s",
            }}
          >
            <div>
              <div
                className="work-essay-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 32,
                  marginBottom: 40,
                }}
              >
                <EssayBlock n="I" label="Problem" body={work.problem} />
                <EssayBlock n="II" label="Approach" body={work.approach} />
                <EssayBlock n="III" label="Outcome" body={work.outcome} accent />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 48,
                  padding: "24px 0",
                  borderTop: "1px solid var(--rule)",
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                {work.aside.map(([v, l], i) => (
                  <div key={i}>
                    <div className="serif" style={{ fontSize: 28, lineHeight: 1 }}>
                      {v}
                    </div>
                    <div className="mono" style={{ marginTop: 6, fontSize: 10 }}>
                      {l}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span className="mono" style={{ marginRight: 4 }}>
                  Stack
                </span>
                {work.stack.map((s) => (
                  <span
                    key={s}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 999,
                      border: "1px solid var(--rule-strong)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--ink-2)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                border: "1px solid var(--rule)",
                borderRadius: 14,
                background: "var(--card)",
                padding: 32,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                minHeight: 340,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                  paddingBottom: 16,
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                <span className="mono">System sketch</span>
                <span className="mono" style={{ color: "var(--ink-4)" }}>
                  fig. {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SystemDiagram kind={work.diagram} />
              </div>
              <div
                className="mono"
                style={{
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: "1px solid var(--rule)",
                  color: "var(--ink-4)",
                  fontSize: 10,
                }}
              >
                Architecture simplified for illustration
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function EssayBlock({
  n,
  label,
  body,
  accent,
}: {
  n: string;
  label: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
          paddingBottom: 10,
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <span
          className="serif"
          style={{
            fontSize: 20,
            fontStyle: "italic",
            color: accent ? "var(--accent)" : "var(--ink-3)",
          }}
        >
          {n}
        </span>
        <span className="mono">{label}</span>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: 1.55,
          color: accent ? "var(--ink)" : "var(--ink-2)",
        }}
      >
        {body}
      </p>
    </div>
  );
}

function SystemDiagram({ kind }: { kind: WorkItem["diagram"] }) {
  const stroke = "var(--ink-2)";
  const dim = "var(--ink-3)";
  const accent = "var(--accent)";
  const bg = "var(--bg-elev)";
  const text: CSSProperties & Record<string, ReactNode> = {
    fontFamily: "var(--font-mono)",
    fontSize: 8,
    fill: "var(--ink-3)",
    letterSpacing: "0.08em",
  };
  const textProps = { fontFamily: "var(--font-mono)", fontSize: 8, fill: "var(--ink-3)", letterSpacing: "0.08em" };

  if (kind === "saas") {
    return (
      <svg viewBox="0 0 320 200" style={{ width: "100%", height: "100%", maxHeight: 240 }}>
        <g>
          <circle cx="30" cy="40" r="10" fill={bg} stroke={stroke} />
          <circle cx="30" cy="100" r="10" fill={bg} stroke={stroke} />
          <circle cx="30" cy="160" r="10" fill={bg} stroke={stroke} />
          <text x="30" y="185" textAnchor="middle" {...textProps}>
            LABS
          </text>
        </g>
        <path d="M40 40 L110 100" stroke={dim} strokeWidth="0.6" />
        <path d="M40 100 L110 100" stroke={dim} strokeWidth="0.6" />
        <path d="M40 160 L110 100" stroke={dim} strokeWidth="0.6" />
        <rect x="110" y="80" width="80" height="40" rx="3" fill={bg} stroke={stroke} />
        <text x="150" y="104" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fill="var(--ink)" fontWeight="500">
          LIMS app
        </text>
        <text x="150" y="138" textAnchor="middle" {...textProps}>
          NEXT.JS · TRPC
        </text>
        <path d="M190 90 L240 50" stroke={accent} strokeWidth="0.8" strokeDasharray="3 3" />
        <rect x="240" y="34" width="60" height="28" rx="3" fill="var(--accent)" opacity="0.1" stroke={accent} />
        <text x="270" y="52" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill={accent} fontWeight="500">
          Claude
        </text>
        <text x="270" y="76" textAnchor="middle" {...textProps}>
          PROTOCOLS
        </text>
        <path d="M190 110 L240 150" stroke={dim} strokeWidth="0.8" />
        <rect x="240" y="138" width="60" height="28" rx="3" fill={bg} stroke={stroke} />
        <text x="270" y="156" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="var(--ink)">
          Postgres
        </text>
        <text x="270" y="180" textAnchor="middle" {...textProps}>
          SPECIMENS
        </text>
      </svg>
    );
  }

  if (kind === "erp") {
    return (
      <svg viewBox="0 0 320 200" style={{ width: "100%", height: "100%", maxHeight: 240 }}>
        <g opacity="0.45">
          <rect x="10" y="20" width="70" height="22" rx="2" fill="none" stroke={dim} strokeDasharray="2 2" />
          <text x="45" y="35" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill={dim}>
            DISPATCH
          </text>
          <line x1="12" y1="22" x2="78" y2="40" stroke={dim} strokeWidth="0.6" />
          <rect x="10" y="52" width="70" height="22" rx="2" fill="none" stroke={dim} strokeDasharray="2 2" />
          <text x="45" y="67" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill={dim}>
            CUSTOMS
          </text>
          <line x1="12" y1="54" x2="78" y2="72" stroke={dim} strokeWidth="0.6" />
          <rect x="10" y="84" width="70" height="22" rx="2" fill="none" stroke={dim} strokeDasharray="2 2" />
          <text x="45" y="99" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill={dim}>
            INVENTORY
          </text>
          <line x1="12" y1="86" x2="78" y2="104" stroke={dim} strokeWidth="0.6" />
        </g>
        <text x="45" y="128" textAnchor="middle" {...textProps}>
          RETIRED
        </text>

        <path d="M88 63 L130 100" stroke={dim} strokeWidth="0.6" />
        <text x="102" y="80" {...textProps}>
          ETL
        </text>

        <rect x="130" y="70" width="100" height="60" rx="4" fill={bg} stroke={stroke} />
        <text x="180" y="95" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fill="var(--ink)" fontWeight="500">
          Meridian ERP
        </text>
        <line x1="140" y1="105" x2="220" y2="105" stroke="var(--rule-strong)" />
        <text x="180" y="120" textAnchor="middle" {...textProps}>
          ROLE-AWARE VIEWS
        </text>

        <circle cx="275" cy="60" r="8" fill={accent} />
        <text x="275" y="82" textAnchor="middle" {...textProps}>
          DISPATCH
        </text>
        <circle cx="275" cy="100" r="8" fill={bg} stroke={stroke} />
        <text x="275" y="122" textAnchor="middle" {...textProps}>
          CUSTOMS
        </text>
        <circle cx="275" cy="140" r="8" fill={bg} stroke={stroke} />
        <text x="275" y="162" textAnchor="middle" {...textProps}>
          OPS LEAD
        </text>
        <path d="M230 90 L265 60" stroke={dim} strokeWidth="0.6" />
        <path d="M230 100 L265 100" stroke={dim} strokeWidth="0.6" />
        <path d="M230 110 L265 140" stroke={dim} strokeWidth="0.6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 200" style={{ width: "100%", height: "100%", maxHeight: 240 }}>
      <rect x="10" y="86" width="52" height="28" rx="2" fill={bg} stroke={stroke} />
      <text x="36" y="104" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="var(--ink)">
        .pdf
      </text>
      <text x="36" y="128" textAnchor="middle" {...textProps}>
        CONTRACT
      </text>
      <path d="M62 100 L100 100" stroke={dim} strokeWidth="0.6" />

      <rect x="100" y="60" width="60" height="28" rx="2" fill={bg} stroke={stroke} />
      <text x="130" y="78" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="var(--ink)">
        Retrieve
      </text>
      <text x="130" y="100" textAnchor="middle" {...textProps}>
        CLAUSE LIB
      </text>

      <rect x="100" y="112" width="60" height="28" rx="2" fill={bg} stroke={stroke} />
      <text x="130" y="130" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="var(--ink)">
        Classify
      </text>
      <text x="130" y="152" textAnchor="middle" {...textProps}>
        CLAUDE
      </text>

      <path d="M160 74 L200 100" stroke={dim} strokeWidth="0.6" />
      <path d="M160 126 L200 100" stroke={dim} strokeWidth="0.6" />

      <circle cx="220" cy="100" r="20" fill="var(--accent)" opacity="0.12" stroke={accent} />
      <circle cx="220" cy="100" r="4" fill={accent} />
      <text x="220" y="136" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill={accent} fontWeight="500">
        Agent
      </text>
      <text x="220" y="152" textAnchor="middle" {...textProps}>
        CITE-BACKED
      </text>

      <path d="M240 100 L278 100" stroke={dim} strokeWidth="0.6" />
      <rect x="278" y="86" width="36" height="28" rx="2" fill={bg} stroke={stroke} />
      <text x="296" y="104" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="var(--ink)">
        ✓
      </text>
      <text x="296" y="128" textAnchor="middle" {...textProps}>
        REVIEW
      </text>

      <path d="M220 80 L220 40" stroke={dim} strokeWidth="0.6" strokeDasharray="2 3" />
      <circle cx="220" cy="30" r="8" fill={bg} stroke={stroke} />
      <text x="220" y="18" textAnchor="middle" {...textProps}>
        HITL
      </text>
    </svg>
  );
}
