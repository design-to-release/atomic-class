import {walk} from 'svelte/compiler';

export default function insertClasses(
    instance,
    magicContent,
    /** configs e.g.
     {
            0: {
                names: ['p0'],
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
                import: 'xx',
                insert: 6,
                classes: '{xx} {yy}'
            }
        }
     */
    configs,
    prefix,
    extraCss,
) {
    Object.keys(configs).forEach(index => {
        const config = configs[index];
        let rs = [];
        if (extraCss && config.import) {
            rs.push(prefix + '-' + config.import);
        }
        if (config.classes) {
            rs.push(config.classes);
        }
        if (rs.length) {
            magicContent.prependLeft(config.insert, `class="${rs.join(' ')}" `);
        }
    });
    return magicContent;
}
