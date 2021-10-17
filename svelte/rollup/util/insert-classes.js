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
                    base: {
                        classes: "ccc cc",
                    },
                    default: {
                        classes: "ddd dd",
                    },
                    hover: {
                        classes: "hhh",
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
        if (config.props && config.props.base && config.props.base.classes) {
            rs.push(config.props.base.classes);
        }
        if (config.classes) {
            rs.push(config.classes);
        }
        if (config.state) {
            rs.push(config.state);
        }
        if (config.id) {
            rs.push(config.id);
        }
        if (rs.length) {
            magicContent.prependLeft(config.insert, `class="${rs.join(' ')}" `);
        }
    });
    return magicContent;
}
