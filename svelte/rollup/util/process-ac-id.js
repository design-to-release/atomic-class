import getPropName from './get-prop-name';
import separateMustacheTag from './separate-mustache';

export default function processAcId(node, magicContent, prefix) {
    let id;
    node.attributes
        .forEach(item => {
            let name = getPropName(item.name, prefix);
            if (name === 'id') {
                const {strings, expressions} = separateMustacheTag(item);
                if (expressions.length) {
                    throw new Error(
                        `[atomic-classes] does not support expressions in props [${item.name}] = ${expressions}`);
                }
                id = strings.join(' ');
                if (!id.match(/^([a-zA-Z\-\_])+$/g)) {
                    throw new Error(
                        `[atomic-classes] illegal id in [${item.name}] = ${id}`);
                }
                magicContent.overwrite(item.start, item.end, '');
            }
        });
    return id;
}