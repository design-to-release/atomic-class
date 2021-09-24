import type { State, StateProps } from './types';
import { split } from '../core';

export default function(state: State, props: StateProps) {
    return  ['base', ...split(state)].map(state => props[state]?.classes || '').join(' ');
}