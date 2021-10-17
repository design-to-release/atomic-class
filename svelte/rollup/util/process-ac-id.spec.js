import processAcId from './process-ac-id';
import MagicString from 'magic-string';
import {parse} from 'svelte/compiler';


describe('processAcId', () => {

    it('<span ></span>', () => {
        const html = '<span ></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcId(node, magicString, 'ac');
        expect(rs).toEqual(undefined);
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-id="ddd"></span>', () => {
        const html = '<span ac-id="ddd"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcId(node, magicString, 'ac');
        expect(rs).toEqual('ddd');
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-id={varp} ></span>', () => {
        const html = '<span ac-id={varp}></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        expect(() => {
            processAcId(node, magicString, 'ac');
        }).toThrow();
    });

    it('<span ac-id="xx.xx" ></span>', () => {
        const html = '<span  ac-id="xx.xx"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        expect(() => {
            processAcId(node, magicString, 'ac');
        }).toThrow();
    });
});
