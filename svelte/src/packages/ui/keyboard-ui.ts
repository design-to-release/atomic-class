import type { UI } from '../core/type';;

export interface KeyboardOptions {
  keycode: number;
}

const createKeyboardUI: UI<KeyboardOptions> = (node, status, options) => {


  function keyDown(target: Event) {
    if ((target as KeyboardEvent).keyCode !== options?.keycode) return;
    status.setState('active');
  }
  function keyUp(target: Event) {
    if ((target as KeyboardEvent).keyCode !== options?.keycode) return;
    status.unsetState('active');
  }

  node.addEventListener('keydown', keyDown);
  node.addEventListener('keyup', keyUp);

  function destroy() {
    node.removeEventListener('keydown', keyDown);
    node.removeEventListener('keyup', keyUp);
  }
  return {
      destroy: destroy,
    };
}

export default createKeyboardUI;