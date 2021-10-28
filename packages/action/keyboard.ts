import type { EventStateHandler } from './types';
import { add, remove, split, has } from '../core';

export const keyboard: EventStateHandler<[number]> = (event, state, keycode) => {
    if (has(state, 'disabled')) return state;
    if ((event as KeyboardEvent).keyCode.toString() !== keycode.toString()) return state;
    switch(event.type) {
      case 'keydown':
        state = add(state, 'active');
        break;
      case 'keyup':
        state = remove(state, 'active');
        break;
    }
    return state;
}

export default keyboard; 