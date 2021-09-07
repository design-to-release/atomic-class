import type { StateProps } from './type';

export function from(node: HTMLElement) {
    const configs: StateProps = {};
    const names = node.getAttributeNames().filter(name => name.indexOf("ac-") == 0);
    names.map(name => {
      const matches = name.match(/^ac\-(\w+)/);
      configs[matches[1]] = {
        classes: node.getAttribute(name),
        overlap: !!name.match(/\-ol($|\-)/)
      }
    });
    return configs;
  }