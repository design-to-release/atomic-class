import { extname } from 'path';
import { parse, walk } from 'svelte/compiler';
import MagicString from 'magic-string';
import { createFilter } from '@rollup/pluginutils';
import processHtml from './util/process-html';
import insertProps from './util/insert-props';
import processExtraCss from './util/process-extra-class';


// const production = !process.env.ROLLUP_WATCH;
// const moduleId = process.env.moduleId || require('../package.json').name;

/**
 * @param options
 * @param options.include
 * @param options.exclude
 * @param options.prefix - if exist, attribute key should start with prefix, such as 'ac-default'
 * @param options.extraCss - if true / less / scss / sass
 * @param options.extraCssFile - default index.css
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
            let configs = processHtml(ast.html, magicContent, options.prefix);
            if (options.extraCss) {
                configs = processExtraCss(configs, options.extraCss, options.prefix);
            }
            insertProps(magicContent, ast.instance, options.prefix, configs);

            return {
                code: magicContent.toString(),
                map: magicContent.generateMap({ source: id }).toString(),
            }
        }
    };
}
