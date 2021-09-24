import processAcImport from './process-ac-import';
import MagicString from 'magic-string';
import { parse } from 'svelte/compiler';


describe('processAcImport', () => {

    it('<span ></span>', () => {
        const html = `<span ></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcImport(node, magicString, 'ac');
        expect(rs).toEqual(undefined);
        expect(magicString.toString()).toEqual(`<span ></span>`);
    });
    
    it('<span ac-import="{ac.xx}"></span>', () => {
        const html = `<span ac-import="{ac.xx}"></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcImport(node, magicString, 'ac');
        expect(rs).toEqual('xx');
        expect(magicString.toString()).toEqual(`<span ></span>`);
    });

    it('<span ac-import={ac.xx}></span>', () => {
        const html = `<span ac-import={ac.xx}></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        const rs = processAcImport(node, magicString, 'ac');
        expect(rs).toEqual('xx');
        expect(magicString.toString()).toEqual(`<span ></span>`);
    });

    it('<span ac-import={varp}></span>', () => {
        const html = `<span ac-import={varp}></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        expect(() => {
            processAcImport(node, magicString, 'ac');
        }).toThrow();
    });

    it('<span ac-import={ac}></span>', () => {
        const html = `<span ac-import={ac}></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        expect(() => {
            processAcImport(node, magicString, 'ac');
        }).toThrow();
    });

    it('<span ac-import="xx"></span>', () => {
        const html = `<span ac-import="xx"></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        expect(() => {
            processAcImport(node, magicString, 'ac');
        }).toThrow();
    });

    it('<span ac-import="xx {ac}"></span>', () => {
        const html = `<span ac-import="xx {ac}"></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        expect(() => {
            processAcImport(node, magicString, 'ac');
        }).toThrow();
    });

    it('<span ac-import="{ac.xx} {ac.yy}"></span>', () => {
        const html = `<span ac-import="{ac.xx} {ac.yy}"></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html.children[0];
        expect(() => {
            processAcImport(node, magicString, 'ac');
        }).toThrow();
    });

});
  