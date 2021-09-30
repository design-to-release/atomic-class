import processClass from './process-class';
import MagicString from 'magic-string';
import {parse} from 'svelte/compiler';


describe('processClass', () => {

    it('<span ></span>', () => {
        const html = '<span ></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processClass(node, magicString, 'ac');
        expect(rs).toEqual(undefined);
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span class="xx yy"></span>', () => {
        const html = '<span class="xx yy"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processClass(node, magicString, 'ac');
        expect(rs).toEqual('xx yy');
        expect(magicString.toString()).toEqual('<span class=""></span>');
    });

    it('<span class="xx yy {zz}"></span>', () => {
        const html = '<span class="xx yy {zz}"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processClass(node, magicString, 'ac');
        expect(rs).toEqual('xx yy');
        expect(magicString.toString()).toEqual('<span class="{zz}"></span>');
    });

    it('<span class="{zz} {pp}"></span>', () => {
        const html = '<span class="{zz} {pp}"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processClass(node, magicString, 'ac');
        expect(rs).toEqual(undefined);
        expect(magicString.toString()).toEqual('<span class="{zz} {pp}"></span>');
    });

    it('<span class="{zz} xx {pp} uu"></span>', () => {
        const html = '<span class="{zz} xx {pp} uu"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processClass(node, magicString, 'ac');
        expect(rs).toEqual('xx uu');
        expect(magicString.toString()).toEqual('<span class="{zz} {pp}"></span>');
    });

    it('<span class={xx}></span>', () => {
        const html = '<span class={xx}></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processClass(node, magicString, 'ac');
        expect(rs).toEqual(undefined);
        expect(magicString.toString()).toEqual('<span class="{xx}"></span>');
    });

});
