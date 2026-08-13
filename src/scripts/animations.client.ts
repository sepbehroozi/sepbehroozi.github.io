// Client-side animation initialization. Loaded only on the homepage from
// index.astro via an inline <script> tag.
//
// Behaviors:
//   - Hero fades/rises in on load
//   - The trace spine (the vertical signal line running through the career
//     timeline) draws itself in once, top to bottom, echoing a captured trace
//   - Stage cards and section labels with [data-anim="reveal"] reveal as they
//     enter the viewport (one-shot, IntersectionObserver-driven)
//   - The "current role" marker's pulse is pure CSS and already respects
//     prefers-reduced-motion via a media query in TraceTimeline.astro
//
// Respect prefers-reduced-motion: all motion here becomes a 0-duration snap.

import { animate, inView, stagger } from 'motion';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const reveal = (el: Element) => {
  if (reduced) {
    (el as HTMLElement).style.opacity = '1';
    return;
  }
  animate(
    el,
    { opacity: [0, 1], y: [12, 0] },
    { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  );
};

export function initAnimations() {
  // Initial state: hide reveal targets so the load entrance is meaningful
  document.querySelectorAll<HTMLElement>('[data-anim="reveal"]').forEach((el) => {
    el.style.opacity = '0';
  });

  // Hero entrance
  const hero = document.querySelector<HTMLElement>('[data-anim="hero"]');
  if (hero) {
    if (reduced) {
      hero.style.opacity = '1';
    } else {
      hero.style.opacity = '0';
      animate(
        hero,
        { opacity: [0, 1], y: [14, 0] },
        { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      );
    }
  }

  // Trace spine draws itself in, then the stage reveals cascade after it
  const spine = document.querySelector<HTMLElement>('[data-anim="trace-line"]');
  if (spine) {
    if (reduced) {
      spine.style.transform = 'scaleY(1)';
    } else {
      animate(
        spine,
        { transform: ['scaleY(0)', 'scaleY(1)'] },
        { duration: 0.9, delay: 0.2, ease: [0.65, 0, 0.35, 1] },
      );
    }
  }

  // Stagger reveal for any [data-anim="reveal"] currently in viewport on load
  const reveals = Array.from(
    document.querySelectorAll<HTMLElement>('[data-anim="reveal"]'),
  );
  if (reveals.length) {
    if (reduced) {
      reveals.forEach((el) => (el.style.opacity = '1'));
    } else {
      const initialDelay = spine ? 0.5 : 0.1;
      animate(
        reveals.slice(0, 6),
        { opacity: [0, 1], y: [12, 0] },
        { duration: 0.55, delay: stagger(0.08, { startDelay: initialDelay }), ease: [0.16, 1, 0.3, 1] },
      );
      // Anything past the first 6 (off-screen on load) gets revealed by inView
      reveals.slice(6).forEach((el) => {
        inView(el, () => {
          reveal(el);
        }, { amount: 0.2 });
      });
    }
  }
}

initAnimations();
