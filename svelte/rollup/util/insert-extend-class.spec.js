import insertCss from './insert-extend-class';
import MagicString from 'magic-string';
import {parse} from 'svelte/compiler';


describe('insertExtendClass', () => {

    it('insertExtendClass 1', () => {
        const configs = {0: {
            id: '_AAA',
            props: {default: {t: ['bg-gray']}},
        }};
        const content = new MagicString('');
        insertCss(null, content, configs, {tailwindcss: true});
        expect(content.toString()).toEqual(`\n<style>._AAA.default{@apply bg-gray;}</style>`);
    });

    it('insertExtendClass 2', () => {
        const configs = {0: {
            id: '_AAA',
            props: {class: {t: ['aa']}, default: {t: ['bg-gray']}},
        }};
        const content = new MagicString('');
        insertCss(null, content, configs, {tailwindcss: true});
        expect(content.toString()).toEqual(`\n<style>._AAA{@apply aa;}\n._AAA.default{@apply bg-gray;}</style>`);
    });

    it('insertExtendClass 3', () => {
        const configs = {0: {
            id: '_AAA',
            props: {class: {t: ['aa']}, default: {t: ['bg-gray']}},
        }};
        const code = '<style lang="postcss"></style>';
        const ast = parse(code, {filename: '00'});
        const content = new MagicString(code);
        insertCss(ast.css, content, configs, {tailwindcss: true});
        expect(content.toString()).toEqual(`<style lang="postcss">._AAA{@apply aa;}\n._AAA.default{@apply bg-gray;}</style>`);
    });

    it('insertExtendClass 4', () => {
        const configs = {0: {
            id: '_AAA',
            props: {class: {t: ['aa']}, default: {t: ['bg-gray'], p: ['%pp', '%qq']}},
        }};
        const code = '<style lang="postcss"></style>';
        const ast = parse(code, {filename: '00'});
        const content = new MagicString(code);
        insertCss(ast.css, content, configs, {tailwindcss: true});
        expect(content.toString()).toEqual(`<style lang="postcss">._AAA{@apply aa;}\n._AAA.default{@apply bg-gray;}</style>`);
    });

    it('insertExtendClass 5', () => {
        const configs = {0: {
            id: '_AAA',
            props: {class: {t: ['aa']}, default: {t: ['bg-gray'], p: ['%pp', '%qq']}},
        }};
        const code = '<style lang="postcss"></style>';
        const ast = parse(code, {filename: '00'});
        const content = new MagicString(code);
        insertCss(ast.css, content, configs, {tailwindcss: true, css: 'scss'});
        expect(content.toString()).toEqual(`<style lang="postcss">._AAA{@apply aa;}\n._AAA.default{@apply bg-gray; @extend %pp,%qq;}</style>`);
    });

});
