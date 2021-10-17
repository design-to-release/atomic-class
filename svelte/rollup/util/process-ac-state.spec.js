import processAcState from './process-ac-state';
import MagicString from 'magic-string';
import {parse} from 'svelte/compiler';


describe('processAcState', () => {

    it('<span ></span>', () => {
        const html = '<span ></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcState(node, magicString, 'ac');
        expect(rs).toEqual(undefined);
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-state="{varp}"></span>', () => {
        const html = '<span ac-state="{varp}"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcState(node, magicString, 'ac');
        expect(rs).toEqual('{varp}');
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-state={varp}></span>', () => {
        const html = '<span ac-state={varp}></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcState(node, magicString, 'ac');
        expect(rs).toEqual('{varp}');
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-state="{varp} {varq}"></span>', () => {
        const html = '<span ac-state="{varp} {varq}"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcState(node, magicString, 'ac');
        expect(rs).toEqual('{varp} {varq}');
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-state="{varp} dd"></span>', () => {
        const html = '<span ac-state="{varp} dd"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        expect(() => {
            processAcState(node, magicString, 'ac');
        }).toThrow();
    });

    it('<span ac-state=""></span>', () => {
        const html = '<span ac-state=""></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        expect(() => {
            processAcState(node, magicString, 'ac');
        }).toThrow();
    });

});
