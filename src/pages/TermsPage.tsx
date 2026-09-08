import { termsContent } from "../data/content";
import { editableField } from "../data/editable";
import { pathForPage, type Page } from "../routes";

interface TermsPageProps {
  onNavigate: (page: Page) => void;
}

const body = "'Inter', sans-serif";
const serif = "'Instrument Serif', serif";
const ink = "rgba(245,243,238,0.72)";

export default function TermsPage({ onNavigate }: TermsPageProps) {
  const nav = (page: Page) => { onNavigate(page); window.scrollTo({ top: 0 }); };

  return (
    <div style={{ background: "#231F20", minHeight: "100vh" }}>
      <section {...editableField("terms")} style={{ padding: "100px 40px 96px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontFamily: body, fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#3AAC88", marginBottom: 20 }}>
            {termsContent.eyebrow}
          </p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.15, color: "#F5F3EE", fontWeight: 400, marginBottom: 20 }}>
            {termsContent.heading}
          </h1>
          <p style={{ fontFamily: body, fontSize: 16, lineHeight: 1.7, color: "rgba(245,243,238,0.6)", margin: "0 0 8px" }}>
            {termsContent.subheading}
          </p>
          <p style={{ fontFamily: body, fontSize: 13, lineHeight: 1.7, color: "#939598", margin: 0 }}>
            {termsContent.meta}
          </p>

          <a
            href={termsContent.downloadHref}
            target="_blank"
            rel="noopener"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 32, padding: "12px 22px", border: "1px solid rgba(58,172,136,0.5)", borderRadius: 999, fontFamily: body, fontSize: 13, color: "#3AAC88", textDecoration: "none", transition: "background 0.2s, border-color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(58,172,136,0.1)"; e.currentTarget.style.borderColor = "#3AAC88"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(58,172,136,0.5)"; }}
          >
            {termsContent.downloadLabel} ↓
          </a>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 48, paddingTop: 8 }}>
            {termsContent.sections.map((section) => (
              <div key={section.heading} style={{ marginTop: 44 }}>
                <h2 style={{ fontFamily: body, fontSize: 15, fontWeight: 600, letterSpacing: "0.01em", color: "#F5F3EE", margin: "0 0 16px" }}>
                  {section.heading}
                </h2>

                {section.body.map((paragraph) => (
                  <p key={paragraph} style={{ fontFamily: body, fontSize: 15, lineHeight: 1.85, color: ink, margin: "0 0 16px" }}>
                    {paragraph}
                  </p>
                ))}

                {section.bullets.length > 0 && (
                  <ul style={{ margin: "0 0 16px", paddingLeft: 22, listStyle: "disc outside" }}>
                    {section.bullets.map((bullet) => (
                      <li key={bullet} style={{ fontFamily: body, fontSize: 15, lineHeight: 1.85, color: ink, marginBottom: 10, listStyle: "disc outside" }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {section.footnote && (
                  <p style={{ fontFamily: body, fontSize: 15, lineHeight: 1.85, color: ink, margin: 0 }}>
                    {section.footnote}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 56, paddingTop: 32 }}>
            <p style={{ fontFamily: body, fontSize: 14, lineHeight: 1.8, color: "#939598", margin: 0 }}>
              {termsContent.contactLine}
            </p>
            <p style={{ fontFamily: body, fontSize: 13, lineHeight: 1.8, color: "#7d7f82", margin: "10px 0 0" }}>
              {termsContent.registeredLine}
            </p>
          </div>

          <a
            href={pathForPage("home")}
            onClick={(event) => { event.preventDefault(); nav("home"); }}
            style={{ fontFamily: body, fontSize: 14, color: "#3AAC88", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24 }}
          >
            ← Back to home
          </a>
        </div>
      </section>
    </div>
  );
}
