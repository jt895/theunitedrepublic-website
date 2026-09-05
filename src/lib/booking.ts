import type { Page } from "../routes";
import { siteContent } from "../data/content";
import { trackCtaClick } from "./analytics";
import { goToContact } from "./contactNav";

/**
 * "Book your free 20 minute call" should book a call.
 *
 * When `site.contact.bookingUrl` in content/site.json is set (a Calendly,
 * Cal.com or Google Calendar appointment page), every book-a-call CTA opens
 * that page in a new tab. When it is empty the CTA falls back to the Contact
 * page and scrolls to the form for the page the visitor came from, so nothing
 * breaks before the scheduler exists.
 */
export function bookingUrl(): string {
  return (siteContent.contact.bookingUrl ?? "").trim();
}

export function hasBooking(): boolean {
  return bookingUrl().length > 0;
}

/** Href for a book-a-call anchor: the scheduler when set, otherwise /contact/. */
export function bookingHref(): string {
  return hasBooking() ? bookingUrl() : "/contact/";
}

export function bookCall(onNavigate: (page: Page) => void, sourcePage: Page, formAnchor?: string): void {
  trackCtaClick("free-call");
  if (hasBooking()) {
    window.open(bookingUrl(), "_blank", "noopener");
    return;
  }
  goToContact(onNavigate, sourcePage, formAnchor);
}
