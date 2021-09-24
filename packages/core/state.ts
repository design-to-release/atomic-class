import type { State }  from './types';
export function split(state: State) {
    if (state.length === 0) return [];
    return state.split(/\s+/);
}
export function add(oldState: State, newState: string){
    const states = split(oldState);
    if (states.indexOf(newState) === -1) {
        states.push(newState);
        return states.join(' ');
    }
    return oldState;
}
export function remove(oldState: State, existedState: State) {
    let states = split(oldState);
    let newStates = split(existedState);
    states = states.filter(item => newStates.indexOf(item) == -1);
    return states.join(' ');
}
export function has(state: State, target: string) {
    if (split(state).indexOf(target) > -1) {
        return true;
    }
    return false;
}