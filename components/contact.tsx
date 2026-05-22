"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "./primitives";

type FormState = {
  name: string;
  email: string;
  project: string;
  budget: string;
  note: string;
};

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    project: "saas",
    budget: "50–100k",
    note: "",
  });
  const [sent, setSent] = useState(false);
  return (
    <section id="contact">
      <div className="container-tt">
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <div>
            <div
              className="eyebrow mono"
              style={{ marginBottom: 24, color: "var(--ink-4)" }}
            >
              <span className="dot" />
              <span>Now booking · Q3 2026</span>
            </div>
            <h2
              className="display"
              style={{
                fontSize: "clamp(48px, 6vw, 88px)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              Tell us what<br />
              you&rsquo;re{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>really</em>{" "}
              trying<br />
              to build.
            </h2>
            <p
              style={{
                fontSize: 18,
                color: "var(--ink-3)",
                maxWidth: 460,
                lineHeight: 1.5,
                margin: 0,
                marginBottom: 40,
              }}
            >
              Thirty minutes with a founder. We&rsquo;ll listen, push back, and either send you a
              written plan within a week — or a referral to someone better suited.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                color: "var(--ink-3)",
                fontSize: 14,
              }}
            >
              <div style={{ display: "flex", gap: 16 }}>
                <span className="mono" style={{ width: 80 }}>EMAIL</span>
                <a
                  href="mailto:hello@techdexllc.com"
                  className="hover-underline"
                  style={{ color: "var(--ink)" }}
                >
                  hello@techdexllc.com
                </a>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <span className="mono" style={{ width: 80 }}>LOCATION</span>
                <span style={{ color: "var(--ink)" }}>Remote · London + Austin</span>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <span className="mono" style={{ width: 80 }}>RESPONSE</span>
                <span style={{ color: "var(--ink)" }}>Within 24 hours · always a human</span>
              </div>
            </div>
          </div>
          <ContactForm form={form} setForm={setForm} sent={sent} setSent={setSent} />
        </div>
      </div>
    </section>
  );
}

function ContactForm({
  form,
  setForm,
  sent,
  setSent,
}: {
  form: FormState;
  setForm: (f: FormState) => void;
  sent: boolean;
  setSent: (s: boolean) => void;
}) {
  const input: CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--rule-strong)",
    padding: "14px 0",
    fontFamily: "inherit",
    fontSize: 16,
    color: "var(--ink)",
    outline: "none",
  };
  const label: CSSProperties = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: "0.15em",
    color: "var(--ink-3)",
    marginBottom: 8,
    textTransform: "uppercase",
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      style={{
        background: "color-mix(in oklch, var(--ink) 4%, transparent)",
        border: "1px solid var(--rule)",
        borderRadius: 16,
        padding: 40,
      }}
    >
      {sent ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 16, color: "var(--accent)" }}>✓</div>
          <h3 className="serif" style={{ fontSize: 32, margin: 0, color: "var(--ink)" }}>
            We&rsquo;ll be in touch.
          </h3>
          <p style={{ color: "var(--ink-3)", marginTop: 12 }}>
            Within 24 hours — from a founder, not an intake bot.
          </p>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 32,
              marginBottom: 24,
            }}
          >
            <div>
              <label style={label}>Your name</label>
              <input
                style={input}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label style={label}>Work email</label>
              <input
                style={input}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={label}>Project type</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              {["saas", "erp", "api", "ai", "not sure"].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setForm({ ...form, project: p })}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    background: form.project === p ? "var(--accent)" : "transparent",
                    color: form.project === p ? "var(--accent-ink)" : "var(--ink-3)",
                    border:
                      form.project === p
                        ? "1px solid var(--accent)"
                        : "1px solid var(--rule-strong)",
                    transition: "all 0.2s",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={label}>Budget</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              {["<50k", "50–100k", "100–250k", "250k+"].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setForm({ ...form, budget: p })}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    background: form.budget === p ? "var(--accent)" : "transparent",
                    color: form.budget === p ? "var(--accent-ink)" : "var(--ink-3)",
                    border:
                      form.budget === p
                        ? "1px solid var(--accent)"
                        : "1px solid var(--rule-strong)",
                    transition: "all 0.2s",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={label}>What are you building?</label>
            <textarea
              style={{
                ...input,
                borderBottom: "1px solid var(--rule-strong)",
                minHeight: 80,
                resize: "vertical",
                paddingTop: 14,
              }}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="A few sentences is plenty."
            />
          </div>
          <button
            type="submit"
            className="btn btn-accent"
            style={{
              width: "100%",
              justifyContent: "center",
              height: 52,
              fontSize: 15,
            }}
          >
            Book the call <ArrowUpRight />
          </button>
        </>
      )}
    </form>
  );
}
