/** @type {Map<HTMLElement, VDom>} */
const ElVDomMap = new WeakMap();

class VDom {
  /** @type {string[]} */
  #states;
  /** @type {string[]} */
  #prevStates;
  /** @type {string[]} */
  #currStates;
  /** @type {Record<string, string>} */
  #sheetRegistry;

  /** @param {string[]} states */
  set currStates(states) {
    this.#prevStates = this.#currStates ?? [];
    this.#currStates = states;
  }

  /** @param {Record<string, string>} sheetRegistry */
  constructor(sheetRegistry) {
    this.#sheetRegistry = sheetRegistry;
  }

  /** @param {string[]} states @param {'merge'|'override'} type */
  setStates(states, type) {
    if (this.#states === undefined || type === 'override') {
      this.#states = states;
    } else if (type === 'merge') {
      this.#states = [...new Set([...this.#states, ...states])];
    }
  }

  /** @param {string} className */
  getUpdatedClassName(className) {
    /** @type {Record<string, 1>} */
    const origClsMap = {};
    for (const i of className.split(' ')) {
      origClsMap[i] = 1;
    }
    for (const i of this.#prevStates) {
      delete origClsMap[this.#sheetRegistry[i]];
    }
    for (const i of this.#currStates) {
      origClsMap[this.#sheetRegistry[i]] = 1;
    }

    return Object.keys(origClsMap).join(' ');
  }
}

/** @param {...string} states */
export function stateHandler(...states) {
  /** @param {Event} ev @param {'merge'|'override'} type */
  return function (ev, type = 'merge') {
    /** @type {HTMLElement} */
    const el = ev.target;
    const vdom = setupVDom(el);
    vdom.setStates(states, type);
    vdom.currStates = states;
    el.className = vdom.getUpdatedClassName(el.className);
  }
}

/** @private @param {HTMLElement} el */
function setupVDom(el) {
  let vdom = ElVDomMap.get(el);
  if (vdom === undefined) {
    vdom = new VDom(getSheetRegistry(el));
    ElVDomMap.set(el, vdom);
  }

  return vdom;
}

/** @private @param {HTMLElement} el */
function getSheetRegistry(el) {
  /** @type {Record<string, string>} */
  const ret = {};
  for (const i of el.attributes) {
    if (i.name.startsWith('ac-')) {
      ret[i.name.slice(3)] = i.value;
    }
  }

  return ret;
}
