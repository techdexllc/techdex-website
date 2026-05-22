import { SectionHead } from "./primitives";

const TEAM = [
  { n: "Ada Morrow", r: "Founding engineer", y: "12y", bio: "Ex-Stripe, ex-Linear. Systems & infra." },
  { n: "Rafael Imani", r: "AI lead", y: "9y", bio: "Claude, LangGraph, formal verification." },
  { n: "Nora Sato", r: "Design principal", y: "14y", bio: "Figma, IDEO. Product-first." },
  { n: "Josef Kleine", r: "ERP lead", y: "16y", bio: "Warehouse floor to boardroom." },
];

export function Team() {
  return (
    <section id="team">
      <div className="container-tt">
        <SectionHead
          eyebrow="The studio"
          title={
            <>
              Four founders.<br />
              <em style={{ fontStyle: "italic" }}>No juniors. No middlemen.</em>
            </>
          }
          sub="A deliberately small partnership. We turn down more work than we take so that the people you meet are the people doing the work."
        />
        <div
          className="team-grid"
          style={{
            marginTop: 72,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {TEAM.map((m, i) => (
            <div key={i}>
              <div
                style={{
                  aspectRatio: "4/5",
                  background:
                    "repeating-linear-gradient(135deg, var(--bg-elev), var(--bg-elev) 8px, var(--card) 8px, var(--card) 16px)",
                  border: "1px solid var(--rule)",
                  borderRadius: 8,
                  position: "relative",
                  marginBottom: 20,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    right: 12,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span className="mono" style={{ fontSize: 9 }}>
                    PORTRAIT · {m.n.toUpperCase().split(" ")[0]}
                  </span>
                  <span className="mono" style={{ fontSize: 9 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 6,
                }}
              >
                <span className="serif" style={{ fontSize: 22 }}>
                  {m.n}
                </span>
                <span className="mono">{m.y}</span>
              </div>
              <div className="mono" style={{ marginBottom: 10 }}>
                {m.r}
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5 }}>
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
