import { extname } from 'path';
import { parse, walk } from 'svelte/compiler';
import MagicString from 'magic-string';
import { createFilter } from '@rollup/pluginutils';
import processHtml from './util/process-html';


// const production = !process.env.ROLLUP_WATCH;
// const moduleId = process.env.moduleId || require('../package.json').name;

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
        name: 'atomic-class-builder',
        async transform(code, id) {
            if (!filter(id) || extname(id) !== '.svelte') return null;
            const ast = parse(code, { filename: id });
            const magicContent = new MagicString(code);
            const configs = processHtml(ast.html, magicContent, options.prefix);
            console.log(id, configs, magicContent.toString());
            walk(ast.instance,{
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
