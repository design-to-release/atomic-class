import type { Status } from '../core';

export default function(status: Status) {
    return  ['base', ...status.states].map(state => status.props[state]?.classes || '').join(' ');
}