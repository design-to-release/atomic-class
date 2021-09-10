import type { EventMapperOptions, EventMapperFunction } from "./type";


interface KeyboardOptions extends EventMapperOptions<KeyboardEvent> {
  keycode: number;
}
interface KeyboardMapper extends EventMapperFunction<KeyboardOptions, KeyboardEvent> {}

const keyboardMapper: KeyboardMapper = function (options){
  const status = options.status;
  if (status.states.indexOf('disable') > -1) return status;
  if ((options.event as KeyboardEvent).keyCode !== options.keycode) return status;
  switch(options.event.type) {
    case 'keydown':
      status.setState('active');
      break;
    case 'keyup':
      status.unsetState('active');
      break;
  }
  return status;
}
export default keyboardMapper;