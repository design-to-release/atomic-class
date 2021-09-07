import type { Status } from '../core/type';

export default function(status: Status) {
    return status.states.map(state => status.props[state]?.classes || '').join(' ');
}