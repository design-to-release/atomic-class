import {extname} from 'path';
import {parse} from 'svelte/compiler';
import MagicString from 'magic-string';
import {createFilter} from '@rollup/pluginutils';
import processHtml from './util/process-html';
import insertClasses from './util/insert-classes';
import insertCss from './util/insert-extend-class';
import findStyle from './util/find-style';

// `cons`t production = !process.env.ROLLUP_WATCH;
// const moduleId = process.env.moduleId || require('../package.json').name;

/**
 * @param options
 * @param options.include
 * @param options.exclude
 * @param options.prefix - if exist, attribute key should start with prefix, such as 'ac-default'
 * @param options.tailwindcss - true ; if support tailwindcss
 * @param options.css - scss(default) | sass | less
 */

export default function (options = {}) {
    const filter = createFilter(options.include, options.exclude);
    options.prefix = options.prefix || 'ac';
    options.tailwindcss = options.tailwindcss === undefined ? true : options.tailwindcss;
    options.css = options.css || 'scss';
    return {
        name: 'atomic-class-builder',
        async transform(code, id) {
            if (!filter(id) || extname(id) !== '.svelte') {
                return null;
            }
            const magicContent = new MagicString(code);
            const styleConf = findStyle(code);
            styleConf.forEach(conf => {
                magicContent.overwrite(conf.start + conf.offset, conf.start + conf.offset + conf.innerHTML.length, '');
            });
            
            const ast = parse(magicContent.toString(), {filename: id});
            let configs = processHtml(ast.html, magicContent, options.prefix);
            if (!configs) return;

            insertClasses(ast.html, magicContent, configs);
            insertCss(ast.css, magicContent, configs, {tailwindcss: options.tailwindcss, css: options.css});

            styleConf.forEach(conf => {
                magicContent.prependLeft(conf.start + conf.offset, conf.innerHTML);
            });
            console.log();

            return {
                code: magicContent.toString(),
                map: magicContent.generateMap({source: id}),
            };
        },
    };
}
