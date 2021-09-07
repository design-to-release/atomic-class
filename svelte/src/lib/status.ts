import { writable } from 'svelte/store';

import type { Writable, Subscriber, Updater } from 'svelte/store';

import type { StateProps, Status, SettableStatus } from '../packages/core/type';

declare type Invalidator<T> = (value?: T) => void;



interface WritableStatus<T> extends Writable<T>, SettableStatus {
}

export function createStatus(classsheet: string): WritableStatus<Status> {
    const { update, set, subscribe } = writable<Status>({states: ['default'], props: {}});
    let props: StateProps;
    let states: string[] = ['default'];
    function secureSet(Status: Status) {
        if (!props) return;
        set(Status);
    }
    return {
        setProps(stateProps: StateProps) {
            props = stateProps;
            secureSet({states: states, props});
        },
        states() {
            return states;
        },
        setStates(newStates: string[]){
            states = newStates;
            secureSet({
                states,
                props,
            });
        },
        setState(newState: string){
            if (props && props[newState] && states.indexOf(newState) === -1) {
                if (props[newState].overlap) {
                    states.push(newState);
                } else {
                    states = states.filter(state => props[state].overlap == true);
                    states.unshift(newState);
                }
                secureSet({states, props});
            }
        },
        unsetState(existedState: string) {
            if (props && props[existedState] && states.indexOf(existedState) > -1) {
                states = states.filter(item => item !== existedState);
                if (props[existedState].overlap !== true) {
                    states.unshift('default');
                }
                secureSet({states: states, props});
            }
        },
        set(Status: Status) {
            states = Status.states;
            props = Status.props;
            secureSet(Status);
        },
        update(updater: Updater<Status>){
            if (!props) return;
            update(updater);
        },
        subscribe(run: Subscriber<Status>, invalidate?: Invalidator<Status>) {
            return subscribe(run, invalidate);
        }
    };
}
