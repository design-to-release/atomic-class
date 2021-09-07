import type { UI } from '../core/type';;

const createMouseUI: UI<undefined> = (node, status) => {

  function mouserEnter(target: Event) {
    status.setState('hover');
  }
  function mouserLeave(target: Event) {
    status.unsetState('hover');
  }
  function mouseDown(target: Event) {
    status.setState('active');
  }
  function mouseUp(target: Event) {
    status.unsetState('active');
  }

  node.addEventListener('mouseenter', (mouserEnter));
  node.addEventListener('mouseleave', mouserLeave);
  node.addEventListener('mousedown', mouseDown);
  node.addEventListener('mouseup', mouseUp);

  function destroy() {
    node.removeEventListener('mouseenter', mouserEnter);
    node.removeEventListener('mouseleave', mouserLeave);
    node.removeEventListener('mousedown', mouseDown);
    node.removeEventListener('mouseup', mouseUp);
  }
  return {
    destroy,
  }
}

export default createMouseUI;