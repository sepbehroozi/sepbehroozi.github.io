// Client-side animation initialization. Loaded only on the homepage from
// Layout.astro via an inline <script> tag with a slot opt-in.
//
// Behaviors:
//   - Sidebar slides in from -16px / fades on initial load
//   - Cards and section labels with [data-anim="reveal"] reveal as they
//     enter the viewport (one-shot, IntersectionObserver-driven)
//   - Backdrop orbs drift continuously and parallax with scroll & cursor
//
// Respect prefers-reduced-motion: all motion becomes a 0-duration snap.

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

  // Sidebar entrance
  const sidebar = document.querySelector<HTMLElement>('[data-anim="sidebar"]');
  if (sidebar) {
    if (reduced) {
      sidebar.style.opacity = '1';
    } else {
      sidebar.style.opacity = '0';
      animate(
        sidebar,
        { opacity: [0, 1], x: [-16, 0] },
        { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      );
    }
  }

  // Stagger reveal for any [data-anim="reveal"] currently in viewport on load
  // (these would otherwise be revealed individually by inView; staggering
  // them at once produces a nicer initial cascade).
  const reveals = Array.from(
    document.querySelectorAll<HTMLElement>('[data-anim="reveal"]'),
  );
  if (reveals.length) {
    if (reduced) {
      reveals.forEach((el) => (el.style.opacity = '1'));
    } else {
      animate(
        reveals.slice(0, 6),
        { opacity: [0, 1], y: [12, 0] },
        { duration: 0.55, delay: stagger(0.06, { startDelay: 0.1 }), ease: [0.16, 1, 0.3, 1] },
      );
      // Anything past the first 6 (off-screen on load) gets revealed by inView
      reveals.slice(6).forEach((el) => {
        inView(el, () => {
          reveal(el);
        }, { amount: 0.2 });
      });
    }
  }

  // Backdrop orb drift + parallax
  const orbs = Array.from(document.querySelectorAll<HTMLElement>('[data-orb]'));
  if (orbs.length && !reduced) {
    orbs.forEach((orb, i) => {
      const amplitude = 18 + i * 6;
      const duration = 18 + i * 4;
      animate(
        orb,
        { x: [0, amplitude, 0], y: [0, -amplitude, 0] },
        { duration, repeat: Infinity, ease: 'easeInOut' },
      );
    });

    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 8;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 8;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });

    // Apply parallax via inline style updates on rAF
    const tick = () => {
      orbs.forEach((orb, i) => {
        const factor = 0.04 + i * 0.02;
        orb.style.translate = `${mouseX * (i + 1)}px ${(-scrollY * factor) + mouseY * (i + 1)}px`;
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

initAnimations();
