import type { Status } from '../core';
export interface EventMapperOptions<E extends Event> {
    event: E,
    status: Status
}

export type EventMapperFunction<T extends EventMapperOptions<E>, E extends Event, > = (options: T) => Status;