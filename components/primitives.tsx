import type { CSSProperties, ReactNode } from "react";

export function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 12L12 4M12 4H5M12 4V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="7" r="4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6" cy="15" r="4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="16" cy="15" r="4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="11" cy="11" r="1.4" fill="var(--accent)" />
    </svg>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: "left" | "center";
}) {
  const style: CSSProperties = {
    maxWidth: align === "center" ? 720 : 820,
    margin: align === "center" ? "0 auto" : "0",
    textAlign: align,
  };
  return (
    <header style={style}>
      <div
        className="eyebrow mono"
        style={{ marginBottom: 24, justifyContent: align === "center" ? "center" : "flex-start" }}
      >
        <span className="dot" />
        <span>{eyebrow}</span>
      </div>
      <h2
        className="display"
        style={{
          fontSize: "clamp(40px, 5vw, 72px)",
          margin: 0,
          marginBottom: 20,
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          style={{
            fontSize: 18,
            color: "var(--ink-3)",
            lineHeight: 1.5,
            margin: 0,
            maxWidth: 560,
            ...(align === "center" ? { marginLeft: "auto", marginRight: "auto" } : {}),
          }}
        >
          {sub}
        </p>
      )}
    </header>
  );
}

export function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div
        className="serif"
        style={{
          fontSize: "clamp(36px, 3.2vw, 52px)",
          lineHeight: 1,
          marginBottom: 6,
          letterSpacing: "-0.02em",
        }}
      >
        {n}
      </div>
      <div className="mono" style={{ whiteSpace: "nowrap" }}>
        {l}
      </div>
    </div>
  );
}

export function PulseDot() {
  return (
    <span style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "var(--accent)",
        }}
      />
      <span
        style={{
          position: "absolute",
          inset: -2,
          borderRadius: "50%",
          background: "var(--accent)",
          opacity: 0.35,
          animation: "pulseRing 1.8s ease-out infinite",
        }}
      />
    </span>
  );
}
