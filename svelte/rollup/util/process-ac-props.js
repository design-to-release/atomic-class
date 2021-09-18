import getPropName from './get-prop-name';
import separateMustacheTag from './separate-mustache';

export default function processAcProps(node, magicContent, prefix) {
    let propsNames;
     node.attributes
        .filter(item => getPropName(item.name, prefix) === "props")
        .forEach(item => {
            const { strings, expressions } = separateMustacheTag(item);
            if (strings.length) {
                throw new Error(`[atomic-classes] does not support strings in props [${prefix}-${expressions}]`);
            }
            propsNames = expressions; 
            magicContent.overwrite(item.start, item.end, '');
     });
     return propsNames;
}