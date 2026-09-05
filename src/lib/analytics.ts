declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Set via the VITE_GA_MEASUREMENT_ID environment variable at build time.
// Vite inlines import.meta.env.VITE_* statically, so this is undefined (and
// analytics stays fully off) in any build/deploy that doesn't set it - local
// dev included.
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

// Microsoft Clarity (session recordings and heatmaps). Same pattern: set
// VITE_CLARITY_ID in the Netlify build environment and it switches on.
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID as string | undefined;

let initialized = false;

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

function initClarity(): void {
  if (!CLARITY_ID || document.getElementById("clarity-script")) return;
  const script = document.createElement("script");
  script.id = "clarity-script";
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(script);
}

/** Loads gtag.js and configures GA4, and Clarity when its ID is set. No-ops without IDs. Client-only. */
export function initAnalytics(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  initClarity();
  if (!MEASUREMENT_ID) return;

  window.gtag = gtag;
  gtag("js", new Date());
  // We send page_view manually on route changes (see trackPageview) since this
  // is a client-routed SPA, so the initial automatic pageview is turned off.
  gtag("config", MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function trackPageview(path: string): void {
  if (typeof window === "undefined" || !MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path });
}

/** Fired on successful Netlify form submission - the site's conversion event. */
export function trackFormSubmit(formName: string): void {
  if (typeof window === "undefined" || !MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", "generate_lead", { form_name: formName });
}

/**
 * Fired when a visitor clicks a call to action, so the free 20 minute call and
 * the paid Viability Session can be measured as separate events rather than
 * one undifferentiated "contact" click.
 */
export function trackCtaClick(ctaId: string): void {
  if (typeof window === "undefined" || !MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", "cta_click", { cta_id: ctaId });
}

/** Phone and email taps are conversions too; they were previously invisible. */
export function trackContactClick(channel: "phone" | "email", location: string): void {
  if (typeof window === "undefined" || !MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", "contact_click", { channel, location });
}
