import {walk} from 'svelte/compiler';

export default function insertProps(
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
                insert: 6
            }
        }
     */
    configs,
    prefix,
) {

    walk(instance, {
        enter(node, parent, prop, index) {

            if (node.type === 'Identifier' && node.name && parent.type === 'VariableDeclarator') {
                Object.keys(configs).forEach(idx => {
                    const config = configs[idx];
                    if (config.names && config.names.includes(node.name)) {
                        insertDeclarator(node, parent, config.props, config.import);
                    }
                });
            }

            if (node.type === 'LabeledStatement' && node.label?.name === '$') {
                Object.keys(configs).forEach(idx => {
                    const config = configs[idx];
                    const name = node.body?.expression?.name || node.body?.expression?.left?.name;
                    if (!name || !config.names.includes(name)) {
                        return;
                    }
                    insertLabeledStatement(node, name, config.props, config.import);
                });
            }

        },
    });

    function insertDeclarator(node, parent, props, imp) {
        let name = node.name;
        let initString = '';
        let impString = '';
        if (parent.init) {
            initString = '...(' + magicContent.slice(parent.init.start, parent.init.end) + '), ';
            magicContent.overwrite(parent.start, parent.end, name);
        }
        if (imp) {
            impString = `, ...(${prefix}.${imp})`;
        }
        magicContent.prependRight(parent.end,
            `; ${name} = {${initString}...${JSON.stringify(props)}, ...${name}${impString}}`);
    }

    function insertLabeledStatement(node, name, props, imp) {
        let impString = '';
        let initString = '';
        if (imp) {
            impString = `, ...(${prefix}.${imp})`;
        }
        if (
            node.body?.expression?.type === 'Identifier' && node.body?.expression?.name === name) {
        }
        else if (node.body?.expression?.type === 'AssignmentExpression') { // '$: p0;'
            initString = '...('
                + magicContent.slice(node.body.expression.right.start, node.body.expression.right.end) + '), ';

        }
        else {
            return;
        }
        magicContent.overwrite(node.body.start, node.body.expression.end, '');
        magicContent.prependLeft(node.body.expression.start,
            `${name} = {${initString}...${JSON.stringify(props)} ${impString}}`);
    }

    return magicContent;
}
