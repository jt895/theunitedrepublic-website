import type { CSSProperties, MouseEvent } from "react";
import type { Page } from "../routes";
import { bookCall, bookingHref } from "../lib/booking";

interface BookCallButtonProps {
  label: string;
  onNavigate: (page: Page) => void;
  sourcePage: Page;
  /** Contact-page form to scroll to when no scheduler URL is configured. */
  formAnchor?: string;
  style?: CSSProperties;
  /** "onGreen" for the pine-green fit-check band, where a green button vanishes. */
  variant?: "default" | "onGreen";
}

const baseStyle: CSSProperties = {
  display: "inline-block",
  background: "#2E9677",
  border: "none",
  cursor: "pointer",
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  fontWeight: 500,
  color: "#fff",
  padding: "16px 32px",
  letterSpacing: "0.02em",
  textDecoration: "none",
  transition: "background 0.25s",
};

/**
 * The site's primary call to action, rendered as a real link.
 *
 * It used to be a <button> that navigated with JavaScript: no href for
 * crawlers, no open-in-new-tab, announced to screen readers as a button. As an
 * anchor it carries the scheduler URL (or /contact/) and still routes through
 * bookCall() for tracking and the source-page form scroll.
 */
export default function BookCallButton({ label, onNavigate, sourcePage, formAnchor, style, variant = "default" }: BookCallButtonProps) {
  const colours = variant === "onGreen"
    ? { bg: "#F5F3EE", hover: "#FFFFFF", fg: "#086F54" }
    : { bg: "#2E9677", hover: "#268A67", fg: "#fff" };
  const href = bookingHref();
  const external = href.startsWith("http");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab, etc.) behave like any other link.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    bookCall(onNavigate, sourcePage, formAnchor);
  };

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      onClick={handleClick}
      style={{ ...baseStyle, background: colours.bg, color: colours.fg, ...style }}
      onMouseEnter={(e) => { e.currentTarget.style.background = colours.hover; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = colours.bg; }}
    >
      {label}
    </a>
  );
}
