export function stateHandler(...states) {
  const acTrigger = new CustomEvent("actrigger", { detail: { states } });
  /** @param {Event} ev */
  return function (ev) {
    /** @type {HTMLElement} */
    const el = ev.target;
    el.dispatchEvent(acTrigger);
  };
}

/**
 * @param {Record<string, string[]>} registry
 * @param {(vm, s: string) => void} cb
 */
export function ac(registry, cb) {
  return function (vm, { detail }) {
    const { states } = detail;
    cb(vm, states.map((i) => registry[i].join(" ")).join(" "));
  };
}
