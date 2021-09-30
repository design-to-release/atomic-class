import separateMustacheTag from './separate-mustache';

export default function processClass(node, magicContent) {
    let classes;
    node.attributes.forEach(item => {
        if (item.name === 'class') {
            const {strings, expressions} = separateMustacheTag(item);
            if (strings.length) {
                classes = strings.join(' ');
            }
            magicContent.overwrite(item.start, item.end, `class="${expressions.map(e => '{' + e +  '}').join(' ')}"`);
        }
    });
    return classes;
}