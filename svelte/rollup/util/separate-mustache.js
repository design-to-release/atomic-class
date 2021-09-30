import {generate} from 'astring';

export default function (attributeNode) {
    const arr = attributeNode.value || [];
    const strings = [];
    const expressions = [];
    for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
        if (val.type === 'MustacheTag') {
            expressions.push(generate(val.expression));
        }
        else {
            let rs = val.raw.replace(/(^\s|\s$)/g, '');
            if (rs) {
                strings.push(rs);
            }
        }
    }
    return {
        strings,
        expressions,
    };
}