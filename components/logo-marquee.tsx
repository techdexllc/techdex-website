export function LogoMarquee() {
  const logos = [
    "ARCHETYPE",
    "NORTHWIND",
    "LUMEN LABS",
    "FIELDSTONE",
    "CAPRA",
    "MERIDIAN",
    "OSTROM",
    "HYPHEN",
    "QUANTA",
    "KILNHOUSE",
    "TYPEDRAFT",
    "SABLE",
  ];
  return (
    <section
      style={{
        padding: "40px 0 60px",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div className="container-tt" style={{ display: "flex", gap: 40, alignItems: "center" }}>
        <span className="mono" style={{ flexShrink: 0, width: 140 }}>Trusted by</span>
        <div
          style={{
            overflow: "hidden",
            flex: 1,
            position: "relative",
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 56,
              whiteSpace: "nowrap",
              animation: "marquee 40s linear infinite",
            }}
          >
            {[...logos, ...logos].map((l, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  color: "var(--ink-3)",
                  letterSpacing: "0.04em",
                  fontStyle: i % 3 === 0 ? "italic" : "normal",
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
