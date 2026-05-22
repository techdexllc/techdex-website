import { Logo } from "./primitives";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--rule)", padding: "60px 0 40px" }}>
      <div className="container-tt">
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 64,
          }}
        >
          <div>
            <div
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}
            >
              <Logo />
              <span style={{ fontWeight: 500, fontSize: 15 }}>TechDex</span>
            </div>
            <p
              style={{
                color: "var(--ink-3)",
                fontSize: 14,
                maxWidth: 320,
                margin: 0,
              }}
            >
              A senior-only technical partnership for founders and operators. Est. 2021.
            </p>
          </div>
          {[
            { h: "Capabilities", l: [{key: "SaaS / MVP", link: "#capabilities"}, {key: "ERP", link: "#capabilities"}, {key: "API & Backend", link: "#capabilities"}, {key: "AI & Automation", link: "#capabilities"}] },
            { h: "Studio", l: [{key: "Work", link: "#work"}] },
            { h: "Contact", l: [{key: "Book a call", link: "#contact"}, {key: "hello@techdexllc.com", link: "mailto:hello@techdexllc.com"}] },
          ].map((col, i) => (
            <div key={i}>
              <div className="mono" style={{ marginBottom: 16 }}>
                {col.h}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  fontSize: 14,
                }}
              >
                {col.l.map((l, j) => (
                  <a
                    href={l.link}
                    key={j}
                    className="hover-underline"
                    style={{ color: "var(--ink-2)" }}
                  >
                    {l.key}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid var(--rule)",
            fontSize: 12,
            color: "var(--ink-4)",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span>© 2026 TechDex Partners, Ltd.</span>
          <span className="mono">Built, not templated.</span>
        </div>
      </div>
    </footer>
  );
}
