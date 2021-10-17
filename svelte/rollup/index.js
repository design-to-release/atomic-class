import {extname} from 'path';
import {parse} from 'svelte/compiler';
import MagicString from 'magic-string';
import {createFilter} from '@rollup/pluginutils';
import processHtml from './util/process-html';
import insertClasses from './util/insert-classes';
import insertCss from './util/insert-tailwindcss';

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

export default function (options = {}) {
    const filter = createFilter(options.include, options.exclude);
    options.prefix = options.prefix || 'ac';
    return {
        name: 'atomic-class-builder',
        async transform(code, id) {
            if (!filter(id) || extname(id) !== '.svelte') {
                return null;
            }
            const ast = parse(code, {filename: id});
            const magicContent = new MagicString(code);
            let configs = processHtml(ast.html, magicContent, options.prefix);
            if (configs) {
                insertClasses(ast.html, magicContent, configs);
                insertCss(ast.css, magicContent, configs);
            }

            return {
                code: magicContent.toString(),
                map: magicContent.generateMap({source: id}).toString(),
            };
        },
    };
}
