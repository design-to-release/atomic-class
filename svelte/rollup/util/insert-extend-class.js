import merge from './merge-class';

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
        class: [Object]
        base: [Object]
        },
        insert: 542,
        classes: undefined,
        end: 938,
        elementPath: [ 'span._D9W0' ],
        acPath: [ '_D9W0' ]
        }
    } **/
    configs,
    options) {
    options = options || {};
    const styles = [];
    for(let i in configs) {
        const config =  configs[i];
        for(let propKey in config.props) {
            styles.push(genStyle(config.id, propKey, config.props[propKey]));
        }
    }
    const cssString= styles.join('\n');
    if (css && css.content) {
        magicContent.prependRight(css.content.start, cssString);
    } else {
        magicContent.append(`\n<style>${cssString}</style>`);
    }

    function genStyle(id, propKey, stateClass) {
        let tcontent;
        if (options.tailwindcss) {
            const tlist = stateClass.t;
            if (tlist) {
                tcontent = `@apply ${tlist.join(' ')};`
            }
        }

        let pcontent;
        if (options.css && options.css.match(/scss|sass/)) {
            const plist = stateClass.p;
            if (plist) {
                pcontent = `@extend ${plist.join(',')};`
            }
        }

        let selector;
        if (propKey === 'class') {
            selector = `.${id}`;
        } else {
            selector = `.${id}.${propKey}`;
        }
        return `${selector}{${merge([tcontent, pcontent], ' ')}}`;
    }
    
    return magicContent;
}

