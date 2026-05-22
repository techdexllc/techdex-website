"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight, Logo } from "./primitives";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const navStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: "backdrop-filter 0.3s, background 0.3s, border-color 0.3s",
    backdropFilter: scrolled ? "blur(14px) saturate(120%)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(14px) saturate(120%)" : "none",
    background: scrolled ? "color-mix(in oklch, var(--bg) 72%, transparent)" : "transparent",
    borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
  };
  const rowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 68,
  };
  const linksStyle: CSSProperties = {
    display: "flex",
    gap: 28,
    alignItems: "center",
    fontSize: 14,
    color: "var(--ink-2)",
  };
  return (
    <nav style={navStyle}>
      <div className="container-tt" style={rowStyle}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              fontSize: 15,
            }}
          >
            TechDex
          </span>
          <span className="mono" style={{ fontSize: 10, marginLeft: 6, opacity: 0.7 }}>
            EST. 2021
          </span>
        </a>
        <div style={linksStyle} className="nav-links">
          <a href="#capabilities" className="hover-underline">Capabilities</a>
          <a href="#process" className="hover-underline">Process</a>
          <a href="#work" className="hover-underline">Work</a>
          {/* <a href="#team" className="hover-underline">Studio</a> */}
          <a href="#contact" className="btn btn-primary" style={{ marginLeft: 10 }}>
            Book a call
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </nav>
  );
}
