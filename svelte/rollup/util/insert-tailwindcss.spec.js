import insertCss from './insert-tailwindcss';
import MagicString from 'magic-string';
import {parse} from 'svelte/compiler';


describe('insertTailwindCss', () => {

    it('insertTailwindCss 1', () => {
        const configs = {0: {
            id: '_AAA',
            props: {base: {classes: ''}, default: {classes: 'bg-gray'}},
        }};
        const content = new MagicString('');
        insertCss(null, content, configs);
        expect(content.toString()).toEqual(`\n<style>\n._AAA.default{@apply bg-gray;}</style>`);
    });

    it('insertTailwindCss 1', () => {
        const configs = {0: {
            id: '_AAA',
            props: {base: {classes: 'aa'}, default: {classes: 'bg-gray'}},
        }};
        const content = new MagicString('');
        insertCss(null, content, configs);
        expect(content.toString()).toEqual(`\n<style>._AAA{@apply aa;}\n._AAA.default{@apply bg-gray;}</style>`);
    });

    it('insertTailwindCss 2', () => {
        const configs = {0: {
            id: '_AAA',
            props: {base: {classes: 'aa'}, default: {classes: 'bg-gray'}},
        }};
        const code = '<style lang="postcss"></style>';
        const ast = parse(code, {filename: '00'});
        const content = new MagicString(code);
        insertCss(ast.css, content, configs);
        expect(content.toString()).toEqual(`<style lang="postcss">._AAA{@apply aa;}\n._AAA.default{@apply bg-gray;}</style>`);
    });
});
