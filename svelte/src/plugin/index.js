const extname = require('path').extname;
const createFilter = require('@rollup/pluginutils').createFilter;
const svelte = require('svelte/compiler');
const MagicString = require('magic-string');
const { generate } = require('astring');
const production = !process.env.ROLLUP_WATCH;
const moduleId = process.env.moduleId || require('../../package.json').name;

/**
 * @param options
 * @param options.include
 * @param options.exclude
 * @param options.stringify - if true returns String, otherwise returns DOM Node
 * @param options.prefix - if exist, attribute key should start with prefix, such as 'rc-active'
 */

export default function(options = {}) {
    const filter = createFilter(options.include, options.exclude);
    options.prefix = options.prefix || 'rc';
    return {
        name: 'classb',
        async transform(code, id) {
            if (!filter(id) || extname(id) !== '.svelte') return null;
            const ast = svelte.parse(code, { filename: id });
            const magicContent = new MagicString(code);
            const reactiveConf = processHtml(ast.html, magicContent, options.prefix);
            console.log(id, production, reactiveConf);
            svelte.walk(ast.instance,{
                enter(node, parent, prop, index) {
                    if (node.type === 'Identifier' && node.name =='classes') {
                        console.log(parent);
                    }
                    
                    // if (node.type === 'VariableDeclaration' && node.declarations) {
                    //     node.declarations.forEach(dec => {
                    //         if (dec.id.name === 'classes') {
                    //             console.log(dec.init);
                    //         }
                            
                    //     });
                    // }
                }
            });
            // const script = genScript(reactiveConf);
            // if (ast.instance) {
            //     magicContent.prependLeft(ast.instance.content.start, script);
            // } else {
            //     magicContent.prepend(`<script>${script}</script>`);
            // }
            // console.log(magicContent.toString());
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
    const reactiveConf = [];
    let rcorder = 0;
    svelte.walk(root, {
        enter(node, parent, prop, index) {
            const states = {};
            let isReactiveNode = false;
            // let variableName = `__rc_${rcorder}`;
            // let tokenId;
            // let bindName, constBindName;
            if (node.type !== 'Element' || !node.attributes) return;
            node.attributes.forEach((item) => {
                let name = getReactiveName(item.name);
                // if (name ==  'id') {
                //     if (item.value && item.value[0] && item.value[0].type === 'Text') {
                //         tokenId = item.value[0].raw;
                //         isReactiveNode = true;
                //         magicContent.overwrite(item.start, item.end, '');
                //     }
                // } else
                if (name) { // rc-active=""
                    const { strings, expressions } = separateMustacheTag(item);
                    if (expressions.length) {
                        throw new Error(`does not support expressions in reactive attribute [${expressions}]`);
                    }
                    states[name] = strings;
                    magicContent.overwrite(item.start, item.end, '');
                    isReactiveNode = true;
                }
            });
            if (!isReactiveNode) return;
            // let findClassAttribute = false;
            let findClassToken = false;
            let variableNames = [];
            node.attributes.forEach((item) => {
                if (item.name == "class") { // class=""
                    const { strings, expressions } = separateMustacheTag(item);
                    states['base'] = strings;
                    // processClassAttribute(item, variableName, magicContent);
                    console.log('findClassToken', expressions);
                    variableNames = expressions.filter(e => !!e.match(/^\$/));
                    // findClassAttribute = true;
                }
            });
            // if (!findClassAttribute) {
            //     magicContent.prependLeft(node.attributes[0].start, `class="{${variableName}}" `);
            // }
            // magicContent.prependLeft(node.attributes[0].start, `use:${variableName}_use `);
            reactiveConf.push({
                // variableName,
                variableNames,
                rcorder,
                // tokenId,
                states,
            });
            rcorder++;
        },
        leave(node, parent, prop, index) {}
    });
    return reactiveConf;
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
            strings.push(val.raw);
        }
    }
    return {
        strings,
        expressions,
    }
}

function processClassAttribute(item, variableName, magicContent) {
    if (item.value && item.value.length == 1 && item.value[0].type == 'MustacheTag') {
        // case {xxx}
        magicContent.prependLeft(item.value[0].start, '\"');
        magicContent.prependLeft(item.end, ` {${variableName}}"`);
    } else {
        // case "xx {xxx}"
        magicContent.prependLeft(item.end - 1, ` {${variableName}}`);
    }
}

function genScript(reactiveConf) {
    let script = [
        '',
        '/** start reactive class code */',
        `import { rc as __rc, iec as __iec } from "${moduleId}";`,
        '__iec($$props);'
    ];
    reactiveConf.forEach((stateConf) => {
        script.push(`let ${stateConf.variableName} = '';`);
        script.push(`const ${stateConf.variableName}_use = __rc(${JSON.stringify(stateConf.states)},(c) => {${stateConf.variableName} = c;}, ${stateConf.rcorder}, "${stateConf.tokenId || ''}");`);
        // if (stateConf.constBindName) {
        //     script.push(`let ${stateConf.constBindName} = '';`);
        // }

        // mscript.push(`_rcrn(${stateConf.bindName}, ${stateConf.variableName}_c).subscribe((c) => {${stateConf.variableName} = c;});`);
    });
    // script.push('_rcom(function(){');
    // script.push(mscript.join('\n'));
    // script.push('});');
    script.push('/** end of reactive class code */');
    script.push('');
    return script.join('\n');
}