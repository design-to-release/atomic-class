import getPropName from './get-prop-name';
import separateMustacheTag from './separate-mustache';

export default function getAcImport(node, magicContent, prefix) {
    let rs;
    let identifier = `${prefix}`;
    node.attributes
        .filter(item => getPropName(item.name, prefix) === 'import')
        .forEach(item => {
            const {strings, expressions} = separateMustacheTag(item);
            if (strings.length) {
                throw new Error(`[atomic-classes] does not support strings in [${prefix}-import]`);
            }
            if (expressions.length === 0) {
                throw new Error(`[atomic-classes] no target in [${prefix}-import]`);
            }
            if (expressions.length > 1) {
                throw new Error(`[atomic-classes] more than one target in [${prefix}-import]`);
            }
            if (expressions[0].match(new RegExp(`^${identifier}\.(\\w+)$`))) {
                rs = RegExp.$1;
                magicContent.overwrite(item.start, item.end, '');
            }
            else {
                throw new Error(`[atomic-classes] [${prefix}-import] must reference object ${identifier}`);
            }
        });
    return rs;
}