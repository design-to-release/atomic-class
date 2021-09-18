import { generate } from 'astring';

export default function(attributeNode) {
    const arr = attributeNode.value || [];
    const strings = [];
    const expressions = [];
    for(var i = 0; i < arr.length; i++) {
        var val = arr[i];
        if (val.type == 'MustacheTag') {
            expressions.push(generate(val.expression));
        } else {
            var rs = val.raw.replace(/(^\s|\s$)/g, '');
            if (rs)
                strings.push(rs);
        }
    }
    return {
        strings,
        expressions,
    }
}