import type { EventMapperOptions, EventMapperFunction } from "./type";

const mouseMapper: EventMapperFunction<EventMapperOptions<MouseEvent>, MouseEvent> = (options) => {
  const status = options.status;
  if (status.states.indexOf('disable') > -1) return status;
  switch(options.event.type) {
    case 'mouseenter':
      status.setState('hover');
      break;
    case 'mouseleave':
      status.unsetState('hover');
      break;
    case 'mousedown':
      status.setState('active');
      break;
    case 'mouseup':
      status.unsetState('active');
      break;
  }
  return status;
}

export default mouseMapper;