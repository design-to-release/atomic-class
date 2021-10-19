import {walk} from 'svelte/compiler';

export default function insertClasses(
    instance,
    magicContent,
    /** configs e.g.
     {
            0: {
                id: "_AAA",
                state: ['p0'],
                props: {
                    default: {
                        t: ["ddd", dd"],
                    },
                    hover: {
                        t: ["hhh"],
                    }
                },
                insert: 6,
                classes: '{xx} {yy}'
            }
        }
     */
    configs
) {
    Object.keys(configs).forEach(index => {
        const config = configs[index];
        let rs = [];
        if (config.id) {
            rs.push(config.id);
        }
        if (config.state) {
            rs.push(config.state);
        }
        if (config.classes) {
            rs.push(config.classes);
        }
        if (config.props && config.props.class && config.props.class.t) {
            rs.push(...config.props.class.t);
        }
        if (rs.length) {
            magicContent.prependLeft(config.insert, `class="${rs.join(' ')}" `);
        }
    });
    return magicContent;
}
