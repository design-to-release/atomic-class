import processAcProps from './process-ac-props';
import MagicString from 'magic-string';
import {parse} from 'svelte/compiler';


describe('processAcProps', () => {

    it('<span ></span>', () => {
        const html = '<span ></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcProps(node, magicString, 'ac');
        expect(rs).toEqual(undefined);
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-props="{varp}"></span>', () => {
        const html = '<span ac-props="{varp}"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcProps(node, magicString, 'ac');
        expect(rs).toEqual(['varp']);
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-props={varp}></span>', () => {
        const html = '<span ac-props={varp}></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcProps(node, magicString, 'ac');
        expect(rs).toEqual(['varp']);
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-props="{varp} {varq}"></span>', () => {
        const html = '<span ac-props="{varp} {varq}"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcProps(node, magicString, 'ac');
        expect(rs).toEqual(['varp', 'varq']);
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-props="{varp} dd"></span>', () => {
        const html = '<span ac-props="{varp} dd"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        expect(() => {
            processAcProps(node, magicString, 'ac');
        }).toThrow();
    });

});
