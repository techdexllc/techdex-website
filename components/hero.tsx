import { ArrowUpRight, Stat } from "./primitives";

const HOW_WE_WORK = [
  {
    n: "01",
    t: "Senior only.",
    b: "No juniors billed at senior rates. The people who scoped it are the people shipping it.",
  },
  {
    n: "02",
    t: "Weekly cadence.",
    b: "Working software every Friday. Not a status slide — a running build you can open.",
  },
  {
    n: "03",
    t: "Own the on-call.",
    b: "We keep the pager for the first 30 days after launch. If it breaks, we hear it first.",
  },
  {
    n: "04",
    t: "Walk away if wrong.",
    b: "If a week in, we can’t make the math work — we refund and recommend someone else.",
  },
];

export function Hero() {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        paddingTop: 160,
        paddingBottom: 0,
      }}
    >
      <div className="container-tt">
        <div className="eyebrow mono reveal" style={{ marginBottom: 36 }}>
          <span className="dot" />
          <span>A technical partner for serious software · est. 2021</span>
        </div>

        <h1
          className="display reveal"
          style={{
            fontSize: "clamp(64px, 10vw, 168px)",
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            margin: 0,
            marginBottom: 40,
            animationDelay: "0.06s",
            maxWidth: "16ch",
          }}
        >
          We build the{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>rare</em>{" "}
          software that ships, scales, and{" "}
          <span style={{ position: "relative", whiteSpace: "nowrap", display: "inline-block" }}>
            runs itself
            <svg
              viewBox="0 0 320 16"
              style={{ position: "absolute", left: 0, bottom: "-0.08em", width: "100%", height: "0.14em" }}
              aria-hidden
              preserveAspectRatio="none"
            >
              <path
                d="M2 10 Q 80 2, 160 8 T 318 6"
                stroke="var(--accent)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
          .
        </h1>

        <div
          className="reveal hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 48,
            alignItems: "end",
            marginBottom: 80,
            animationDelay: "0.16s",
          }}
        >
          <p
            style={{
              fontSize: "clamp(17px, 1.3vw, 21px)",
              lineHeight: 1.45,
              color: "var(--ink-2)",
              margin: 0,
              maxWidth: 560,
            }}
          >
            A senior-only studio for founders and operators. MVPs in weeks. ERPs that don&rsquo;t rot.
            AI workflows that save real hours — not demo minutes.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <a href="#contact" className="btn btn-primary">
              Book a 30-min call
              <ArrowUpRight />
            </a>
            <a href="#work" className="btn">
              See recent work
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>

      <ProofStrip />
    </section>
  );
}

function ProofStrip() {
  return (
    <div
      className="reveal proof-strip"
      style={{
        borderTop: "1px solid var(--rule-strong)",
        borderBottom: "1px solid var(--rule-strong)",
        background: "var(--bg-elev)",
        animationDelay: "0.28s",
      }}
    >
      <div
        className="container-tt proof-inner"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 56,
          alignItems: "stretch",
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        <div
          className="proof-left"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            paddingRight: 56,
            borderRight: "1px solid var(--rule)",
          }}
        >
          <div className="mono">By the numbers</div>
          <div
            className="proof-metrics"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, auto)",
              gap: 40,
              alignItems: "end",
            }}
          >
            <Stat n="47" l="Shipped" />
            <Stat n="4.8w" l="Median" />
            <Stat n="9" l="Seniors" />
          </div>
        </div>

        <div
          className="proof-right"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            minWidth: 0,
          }}
        >
          <div className="mono">How we work</div>
          <div
            className="proof-pillars"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 48,
              rowGap: 20,
            }}
          >
            {HOW_WE_WORK.map((p) => (
              <div
                key={p.n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 14,
                  alignItems: "start",
                }}
              >
                <span
                  className="mono"
                  style={{ color: "var(--accent)", fontSize: 11, paddingTop: 4 }}
                >
                  {p.n}
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "var(--ink-3)",
                  }}
                >
                  <span
                    className="serif"
                    style={{
                      color: "var(--ink)",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.t}
                  </span>{" "}
                  {p.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
