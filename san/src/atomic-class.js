export function stateHandler(...states) {
  const acTrigger = new CustomEvent('actrigger', { detail: { states } });
  /** @param {Event} ev */
  return function (ev) {
    /** @type {HTMLElement} */
    const el = ev.target;
    el.dispatchEvent(acTrigger);
  }
}
