import type { EventStateHandler } from './types';
import { add, remove, split, has } from '../core';
export const cursorState = 'default hover';
// export const usabilityState = 'enabled disabled invalid';
export const mouse: EventStateHandler<[]> = (event, state) => {
    if (has(state, 'disabled')) return state;
    switch(event.type) {
      case 'mouseenter':
        state = remove(state, cursorState);
        state = add(state, 'hover');
        break;
      case 'mouseleave':
        state = remove(state, cursorState);
        state = add(state, 'default');
        break;
      case 'mousedown':
        state = add(state, 'active');
        break;
      case 'mouseup':
        state = remove(state, 'active');
        break;
    }
    return state;
}

export default mouse; 