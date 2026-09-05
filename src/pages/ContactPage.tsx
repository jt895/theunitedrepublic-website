import { useState } from "react";
import { trackContactClick, trackCtaClick } from "../lib/analytics";
import { bookingUrl, hasBooking } from "../lib/booking";
import EnquiryForm from "../components/EnquiryForm";
import HoloGlass from "../components/HoloGlass";
import { contactContent, siteContent } from "../data/content";
import { editableField } from "../data/editable";
import { readContactSource } from "../lib/contactNav";
import type { Page } from "../routes";

interface ContactPageProps {
  onNavigate: (page: Page) => void;
}

export default function ContactPage(_props: ContactPageProps) {
  const [sourcePage] = useState(() => readContactSource());

  return (
    <div style={{ background: "#231F20", minHeight: "100vh" }}>

      {/* Hero */}
      <section {...editableField("contact.hero")} style={{ padding: "100px 40px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <HoloGlass />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(38px, 5vw, 64px)", lineHeight: 1.08, color: "#F5F3EE", fontWeight: 400, marginBottom: 24 }} className="hero-title">
            {contactContent.hero.title}
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, lineHeight: 1.75, color: "rgba(245,243,238,0.6)" }} className="hero-sub">
            {contactContent.hero.body}
          </p>
        </div>
      </section>

      {/* Book a call. Only rendered once site.contact.bookingUrl is set; until
          then the forms below are the first thing under the hero. */}
      {hasBooking() && (
        <section {...editableField("contact.booking")} style={{ padding: "64px 40px 0" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", background: "#212B24", borderTop: "2px solid #2E9677", padding: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#3AAC88", marginBottom: 12 }}>
                {contactContent.booking.eyebrow}
              </p>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(26px, 3vw, 38px)", color: "#F5F3EE", fontWeight: 400, marginBottom: 16 }}>
                {contactContent.booking.title}
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.7, color: "rgba(245,243,238,0.6)", margin: 0 }}>
                {contactContent.booking.body}
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <a
                href={bookingUrl()}
                target="_blank"
                rel="noopener"
                onClick={() => trackCtaClick("free-call")}
                style={{ display: "inline-block", background: "#2E9677", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: "#fff", padding: "16px 32px", textDecoration: "none", transition: "background 0.25s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#268A67"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#2E9677"; }}
              >
                {contactContent.booking.ctaLabel}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* What happens next: moved up from the foot of the page, where nobody
          saw it, to sit beside the decision it is meant to de-risk. */}
      <section {...editableField("contact.whatHappensNext")} style={{ padding: "48px 40px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {contactContent.whatHappensNext.steps.map((step, i) => (
            <div key={i} style={{ background: "#1D191A", padding: "24px 28px", display: "grid", gridTemplateColumns: "40px 1fr", gap: 16, alignItems: "center", borderTop: "1px solid rgba(46,150,119,0.35)" }}>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: "rgba(46,150,119,0.7)" }}>{i + 1}</span>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.6, color: "rgba(245,243,238,0.7)", margin: 0 }}>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The forms */}
      <section {...editableField("contact.forms")} style={{ padding: "48px 40px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(26px, 3vw, 38px)", color: "#F5F3EE", fontWeight: 400, textAlign: "center", marginBottom: 12 }}>
            {hasBooking() ? contactContent.forms.titleWithBooking : contactContent.forms.title}
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.7, color: "rgba(245,243,238,0.55)", textAlign: "center", marginBottom: 40 }}>
            {contactContent.forms.intro}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
            {/* Growth Program form */}
            <div style={{ background: "#252122", padding: "48px", borderTop: "2px solid #2E9677" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#3AAC88", marginBottom: 12 }}>
                {contactContent.forms.growthProgram.displayName}
              </p>
              <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: "#F5F3EE", fontWeight: 400, marginBottom: 16 }}>
                {contactContent.forms.growthProgram.title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(245,243,238,0.55)", marginBottom: 32 }}>
                {contactContent.forms.growthProgram.intro}
              </p>
              <EnquiryForm
                id={contactContent.forms.growthProgram.id}
                formName={contactContent.forms.growthProgram.formName}
                submitLabel={contactContent.forms.growthProgram.submitLabel}
                sourcePage={sourcePage}
                accent="#2E9677"
                fields={[
                  { name: "name", label: "Name", type: "text" },
                  { name: "business", label: "Business name", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "phone", label: "Phone (optional)", type: "tel" },
                  { name: "message", label: "What's slowed down, or what are you trying to grow?", type: "textarea" },
                ]}
              />
            </div>

            {/* Viability Session form */}
            <div style={{ background: "#252122", padding: "48px", borderTop: "2px solid #086F54" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#3AAC88", marginBottom: 12 }}>
                {contactContent.forms.viabilitySession.displayName}
              </p>
              <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: "#F5F3EE", fontWeight: 400, marginBottom: 16 }}>
                {contactContent.forms.viabilitySession.title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(245,243,238,0.55)", marginBottom: 32 }}>
                {contactContent.forms.viabilitySession.intro}
              </p>
              <EnquiryForm
                id={contactContent.forms.viabilitySession.id}
                formName={contactContent.forms.viabilitySession.formName}
                submitLabel={contactContent.forms.viabilitySession.submitLabel}
                sourcePage={sourcePage}
                accent="#2E9677"
                fields={[
                  { name: "name", label: "Name", type: "text" },
                  { name: "business", label: "Business name", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "phone", label: "Phone (optional)", type: "tel" },
                  { name: "message", label: "What do you want to look at in the session?", type: "textarea" },
                ]}
              />
            </div>

            {/* Strategic Advisory form */}
            <div style={{ background: "#252122", padding: "48px", borderTop: "2px solid rgba(147,149,152,0.5)" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#939598", marginBottom: 12 }}>
                {contactContent.forms.strategicAdvisory.displayName}
              </p>
              <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: "#F5F3EE", fontWeight: 400, marginBottom: 16 }}>
                {contactContent.forms.strategicAdvisory.title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(245,243,238,0.55)", marginBottom: 32 }}>
                {contactContent.forms.strategicAdvisory.intro}
              </p>
              <EnquiryForm
                id={contactContent.forms.strategicAdvisory.id}
                formName={contactContent.forms.strategicAdvisory.formName}
                submitLabel={contactContent.forms.strategicAdvisory.submitLabel}
                sourcePage={sourcePage}
                accent="#939598"
                fields={[
                  { name: "name", label: "Name", type: "text" },
                  { name: "organisation", label: "Organisation", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "phone", label: "Phone (optional)", type: "tel" },
                  { name: "message", label: "What are you trying to change?", type: "textarea" },
                ]}
              />
            </div>
          </div>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.7, color: "rgba(245,243,238,0.4)", textAlign: "center", maxWidth: 620, margin: "32px auto 0" }}>
            {contactContent.forms.note}
          </p>
        </div>
      </section>

      {/* Grow It Yourself waitlist */}
      <section {...editableField("contact.waitlist")} style={{ background: "#1D191A", padding: "64px 40px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#3AAC88", marginBottom: 12, textAlign: "center" }}>
            {contactContent.waitlist.eyebrow}
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(22px, 2.5vw, 30px)", color: "#F5F3EE", fontWeight: 400, textAlign: "center", marginBottom: 12 }}>
            {contactContent.waitlist.title}
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(245,243,238,0.55)", textAlign: "center", marginBottom: 32 }}>
            {contactContent.waitlist.intro}
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: 480 }}>
              <EnquiryForm
                id={contactContent.waitlist.id}
                formName={contactContent.waitlist.formName}
                submitLabel={contactContent.waitlist.submitLabel}
                sourcePage={sourcePage}
                fields={[
                  { name: "name", label: "Name", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "business", label: "Business name", type: "text" },
                  { name: "message", label: contactContent.waitlist.messageFieldLabel, type: "textarea" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Direct */}
      <section {...editableField("contact.direct")} style={{ padding: "64px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(22px, 2.5vw, 30px)", color: "#F5F3EE", fontWeight: 400, marginBottom: 24 }}>
            {contactContent.direct.title}
          </h2>
          <a href={`mailto:${siteContent.contact.email}`} onClick={() => trackContactClick("email", "contact-page")} style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(245,243,238,0.7)", textDecoration: "none", marginBottom: 8 }}>
            {siteContent.contact.email}
          </a>
          <a href={siteContent.contact.phoneHref} onClick={() => trackContactClick("phone", "contact-page")} style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(245,243,238,0.7)", textDecoration: "none", marginBottom: 16 }}>
            {siteContent.contact.phone}
          </a>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#939598", margin: "0 0 20px" }}>
            {siteContent.location}
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(245,243,238,0.5)", margin: 0 }}>
            {contactContent.whatHappensNext.footnote}
          </p>
        </div>
      </section>

    </div>
  );
}
