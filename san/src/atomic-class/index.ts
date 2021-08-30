export function stateHandler(...states: string[]) {
  const acTrigger = new CustomEvent('actrigger', { detail: { states } });
  return function(ev: Event) {
    const el = ev.target as HTMLElement;
    el.dispatchEvent(acTrigger);
  };
}

export function ac(registry: Record<string, string[]>, cb: (vm: unknown, s: string) => void) {
  return function(vm: unknown, { detail }: { detail: { states: string[] } }) {
    const { states } = detail;
    cb(vm, states.map((i) => registry[i].join(' ')).join(' '));
  };
}
