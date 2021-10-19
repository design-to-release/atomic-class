import getPropName from './get-prop-name';
import separateMustacheTag from './separate-mustache';

export default function processAcAttrs(node, magicContent, prefix) {
    const props = {};
    node.attributes
        .forEach(item => {
            let name = getPropName(item.name, prefix);
            if (name && name !== 'state' && name !== 'id') {
                const {strings, expressions} = separateMustacheTag(item);
                if (expressions.length) {
                    throw new Error(
                        `[atomic-classes] does not support expressions in props [${item.name}] = ${expressions}`);
                }
                const t = [], p = [] , a = [], m = [];
                const arr = [];
                strings.forEach(s => {
                    arr.push(...s.split(/\s/g));
                });
                for(var str of arr) {
                    if(str.indexOf('%') === 0) {
                        p.push(str);
                    } else if(str.indexOf('@') === 0) {
                        a.push(str);
                    } else if(str.indexOf('$') === 0) {
                        m.push(str);
                    } else if(str.match(/^[a-zA-Z\-\_]/)) {
                        t.push(str);
                    }
                }
                props[name] = {
                    t: t.length ? t : undefined,
                    p: p.length ? p : undefined,
                    a: a.length ? a : undefined,
                    m: m.length ? m : undefined,
                };
                magicContent.overwrite(item.start, item.end, '');
            }
        });
    return props;
}