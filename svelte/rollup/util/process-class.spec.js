import processClass from './process-class';
import MagicString from 'magic-string';
import {parse} from 'svelte/compiler';


describe('processClass', () => {

    it('<span ></span>', () => {
        const html = '<span ></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processClass(node, magicString, 'ac');
        expect(rs).toEqual({baseClasses: undefined, classes: undefined});
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span class="xx yy"></span>', () => {
        const html = '<span class="xx yy"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processClass(node, magicString, 'ac');
        expect(rs).toEqual({ baseClasses: 'xx yy', classes: undefined });
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span class="xx yy {zz}"></span>', () => {
        const html = '<span class="xx yy {zz}"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processClass(node, magicString, 'ac');
        expect(rs).toEqual({ baseClasses: 'xx yy', classes: '{zz}'});
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span class="{zz} {pp}"></span>', () => {
        const html = '<span class="{zz} {pp}"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processClass(node, magicString, 'ac');
        expect(rs).toEqual({baseClasses: undefined, classes: '{zz} {pp}'});
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span class="{zz} xx {pp} uu"></span>', () => {
        const html = '<span class="{zz} xx {pp} uu"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processClass(node, magicString, 'ac');
        expect(rs).toEqual({ baseClasses: 'xx uu', classes: '{zz} {pp}'});
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span class={xx}></span>', () => {
        const html = '<span class={xx}></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processClass(node, magicString, 'ac');
        expect(rs).toEqual({baseClasses: undefined, classes: '{xx}'});
        expect(magicString.toString()).toEqual('<span ></span>');
    });

});
