import separateMustacheTag from './separate-mustache';

export default function processClass(node, magicContent) {
    let baseClasses;
    let classes;
    node.attributes.forEach(item => {
        if (item.name === 'class') {
            const {strings, expressions} = separateMustacheTag(item);
            if (strings.length) {
                baseClasses = strings.join(' ');
            }
            if (expressions.length) {
                classes = expressions.map(e => '{' + e +  '}').join(' ');
            }
            magicContent.overwrite(item.start, item.end, '');
        }
    });
    return {
        baseClasses,
        classes
    };
}