export default function(
    css,
    magicContent,
    /** {
        '532': {
        name: 'span',
        id: '_D9W0',
        state: '{state}',
        props: {
        default: [Object],
        hover: [Object],
        active: [Object],
        disabled: [Object],
        base: [Object]
        },
        insert: 542,
        classes: undefined,
        end: 938,
        elementPath: [ 'span._D9W0' ],
        acPath: [ '_D9W0' ]
        }
    } **/
    configs) {
    const styles = [];
    for(let i in configs) {
        const config =  configs[i];
        for(let propKey in config.props) {
            styles.push(genStyle(config.id, propKey, config.props[propKey].classes));
        }
    }
    const cssString= styles.join('\n');
    if (css && css.content) {
        magicContent.prependRight(css.content.start, cssString);
    } else {
        magicContent.append(`\n<style>${cssString}</style>`);
    }
    return magicContent;
}

function genStyle(id, propKey, classes) {
    if (!classes || classes.match(/\S/) === null) return '';
    let selector;
    let content;
    if (propKey === 'base') {
        selector = `.${id}`;
    } else {
        selector = `.${id}.${propKey}`;
    }
    content = `@apply ${classes};`
    return `${selector}{${content}}`
}