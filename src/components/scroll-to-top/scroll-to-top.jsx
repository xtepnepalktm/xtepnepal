"use client";

import { useEffect } from "react";

import { usePathname } from "@/routes/hooks";

// ----------------------------------------------------------------------

const GUARD_DURATION_MS = 2000;

const scrollToTopInstantly = () =>
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

/**
 * Forces the window to the top on every route change.
 *
 * Several routes render their primary content on the client (useSWR fetches,
 * images) after the route has already committed, and as that content streams
 * in, Next's own router calls `scrollIntoView()`/`focus()` on the new route's
 * boundary element to reset scroll — but with the site's global
 * `scroll-behavior: smooth`, that reset (and any plain `scrollTo(0, 0)`) is
 * animated rather than instant, so a later native scroll-into-view call can
 * win the race and leave the page resting partway down, sometimes as far as
 * the footer. Explicitly requesting `behavior: "instant"` bypasses the CSS
 * smooth-scroll and reasserts the top position immediately, and this keeps
 * re-asserting for a couple of seconds while async content is still
 * settling, backing off the moment the user scrolls on their own.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    scrollToTopInstantly();

    let userInteracted = false;
    const markInteracted = () => {
      userInteracted = true;
    };

    const resetIfDrifted = () => {
      if (!userInteracted && window.scrollY !== 0) {
        scrollToTopInstantly();
      }
    };

    const observer = new MutationObserver(resetIfDrifted);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    window.addEventListener("wheel", markInteracted, { passive: true });
    window.addEventListener("touchstart", markInteracted, { passive: true });

    const stopTimer = setTimeout(() => observer.disconnect(), GUARD_DURATION_MS);

    return () => {
      observer.disconnect();
      clearTimeout(stopTimer);
      window.removeEventListener("wheel", markInteracted);
      window.removeEventListener("touchstart", markInteracted);
    };
  }, [pathname]);

  return null;
}
