import processAcAttrs from './process-ac-attrs';
import MagicString from 'magic-string';
import {parse} from 'svelte/compiler';


describe('processAcAttrs', () => {

    it('<span ></span>', () => {
        const html = '<span ></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcAttrs(node, magicString, 'ac');
        expect(rs).toEqual({});
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-default="ddd dd"></span>', () => {
        const html = '<span ac-default="ddd dd"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcAttrs(node, magicString, 'ac');
        expect(rs).toEqual({default: {t: ['ddd', 'dd']}});
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-default="ddd dd %ss @aa $mm /xx"></span>', () => {
        const html = '<span ac-default="ddd dd %ss @aa $mm /xx"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcAttrs(node, magicString, 'ac');
        expect(rs).toEqual({default: {t: ['ddd', 'dd'], p: ["%ss"], a: ["@aa"], m: ['$mm']}});
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-default="{varp} ddd"></span>', () => {
        const html = '<span ac-default="{varp} dd"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        expect(() => {
            processAcAttrs(node, magicString, 'ac');
        }).toThrow();
    });

    it('<span ac-default={varp} ></span>', () => {
        const html = '<span ac-default={varp}></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        expect(() => {
            processAcAttrs(node, magicString, 'ac');
        }).toThrow();
    });
    it('<span ac-default=varp ></span>', () => {
        const html = '<span ac-default={varp}></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        expect(() => {
            processAcAttrs(node, magicString, 'ac');
        }).toThrow();
    });

});
