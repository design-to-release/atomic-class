const extname = require('path').extname;
const createFilter = require('@rollup/pluginutils').createFilter;
const svelte = require('svelte/compiler');
const MagicString = require('magic-string');
const { generate } = require('astring');
const production = !process.env.ROLLUP_WATCH;
const moduleId = process.env.moduleId || require('../package.json').name;

/**
 * @param options
 * @param options.include
 * @param options.exclude
 * @param options.prefix - if exist, attribute key should start with prefix, such as 'ac-default'
 */

export default function(options = {}) {
    const filter = createFilter(options.include, options.exclude);
    options.prefix = options.prefix || 'ac';
    return {
        name: 'classb',
        async transform(code, id) {
            if (!filter(id) || extname(id) !== '.svelte') return null;
            const ast = svelte.parse(code, { filename: id });
            const magicContent = new MagicString(code);
            const configs = processHtml(ast.html, magicContent, options.prefix);
            // console.log(id, configs, magicContent.toString());
            svelte.walk(ast.instance,{
                enter(node, parent, prop, index) {
                    if (node.type === 'Identifier' && node.name && parent.type === 'VariableDeclarator' && configs[node.name]) {
                        let init = '';
                        if (parent.init) {
                            init = '...(' + magicContent.slice(parent.init.start, parent.init.end) + '), ';
                            magicContent.overwrite(parent.start, parent.end, node.name);
                        }
                        magicContent.prependRight(parent.end, `; ${node.name} = {${init}...${JSON.stringify(configs[node.name])}, ...${node.name}}`);
                    }
                    
                }
            });
            return {
                code: magicContent.toString(),
                map: magicContent.generateMap({ source: id }).toString(),
            }
        }
    };
}
function processHtml(root, magicContent, prefix) {
    function getReactiveName(name) {
        var rs;
        if (prefix) {
            let reg = name.match(new RegExp(`^${prefix}-([^)]+)`));
            if (reg && reg[1]) rs = reg[1];
        }
        return rs;
    }
    const configs = {};
    svelte.walk(root, {
        enter(node, parent, prop, index) {
            const props = {};
            let propsNames;
            if (node.type !== 'Element' || !node.attributes) return;
            node.attributes.forEach((item) => {
                let name = getReactiveName(item.name);
                if (name === "props") {
                    const { strings, expressions } = separateMustacheTag(item);
                    if (strings.length) {
                        throw new Error(`[atomic-classes] does not support strings in props [${prefix}-${expressions}]`);
                    }
                    propsNames = expressions; 
                    magicContent.overwrite(item.start, item.end, '');
                } else if (name) {
                    const { strings, expressions } = separateMustacheTag(item);
                    if (expressions.length) {
                        throw new Error(`[atomic-classes] does not support expressions in props [${prefix}-${expressions}]`);
                    }
                    props[name.replace(/\-ol$/, '')] =  {classes: strings.join(' '), overlap: !!name.match(/\-ol$/)};
                    magicContent.overwrite(item.start, item.end, '');
                }
            });
            if (!propsNames) return;
            node.attributes.forEach((item) => {
                if (item.name == "class") { // class=""
                    const { strings, expressions } = separateMustacheTag(item);
                    props['base'] = {classes: strings.join(' ')};
                    magicContent.overwrite(item.start, item.end, `${item.name}="${expressions.map(e => '{'+ e +  '}').join(' ')}"`)
                }
            });
            propsNames.forEach(name => {
                if (configs[name]) {
                    console.warn(`[atomic-classes] bind ac-props {${name}} to more than one dom`);
                }
                configs[name] = props;
            });
        },
        leave(node, parent, prop, index) {}
    });
    return configs;
}

function separateMustacheTag(attributeNode) {
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
