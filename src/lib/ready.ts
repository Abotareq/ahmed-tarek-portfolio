/**
 * Tiny readiness signal so the hero intro waits for the preloader to lift.
 */
const EVENT = "site:ready";
let ready = false;

export function markReady() {
  if (ready) return;
  ready = true;
  window.dispatchEvent(new Event(EVENT));
}

export function onReady(cb: () => void): () => void {
  if (ready) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(EVENT, handler, { once: true });
  return () => window.removeEventListener(EVENT, handler);
}
