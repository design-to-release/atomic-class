import getPropName from './get-prop-name';
import separateMustacheTag from './separate-mustache';

export default function processAcState(node, magicContent, prefix) {
    let expression;
    node.attributes
        .filter(item => getPropName(item.name, prefix) === 'state')
        .forEach(item => {
            const {strings, expressions} = separateMustacheTag(item);
            if (strings.length) {
                throw new Error(`[atomic-classes] does not support strings in props [{item.name}]`);
            }
            if (expressions.length === 0) {
                throw new Error(`[atomic-classes] empty [${item.name}] = ${expressions}`);
            }
            expression = '{' + expressions.join('} {') + '}';
            magicContent.overwrite(item.start, item.end, '');
        });
    return expression;
}