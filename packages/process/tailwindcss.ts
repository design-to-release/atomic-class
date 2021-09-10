import type { Status } from '../core';

export default function(status: Status) {
    const rs: any[] = [];
    const classes: string[] = [];
    const cls = [];
    ['base', ...status.states].forEach(state => {
        const c = status.props[state]?.classes || '';
        const l: any = {};
        c.split(/\s/).forEach(className => {
            const nameWithoutVariant = className.split(':').pop().split(/-\d+$/).shift();
            const part = nameWithoutVariant.split('-');
            let key = part[0];
            if (part[1] && ['x', 'y', 'w', 'h', 'cols', 'rows', 'span', 'clip', 'opacity', 'repeat'].indexOf(part[1]) > -1) {
            key += '-' + part[1];
            }
            l[key] = l[key] || [];
            l[key].push(className);
        });
        rs.push(l);
    });
    const merged = Object.assign({}, ...rs);
    Object.keys(merged).forEach((key) => {
      classes.push(merged[key].join(' '));
    });
    return classes.join(' ');

}