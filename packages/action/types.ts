type State = string;
export type EventStateHandler<T extends Array<any>> = (event: Event, state: State, ...props: T) => State;