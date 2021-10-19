import processHtml from './process-html';
import MagicString from 'magic-string';
import {parse} from 'svelte/compiler';


describe('processNode', () => {

    it('<span ></span>', () => {
        const html = '<span ></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual(undefined);
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-state={p0}></span>', () => {
        const html = '<span ac-state={p0}></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({
            0: {
                name: 'span',
                state: '{p0}', props: {
                },
                insert: 6,
                classes: undefined,
                end: html.length,
                id: '_D9W0',
                elementPath: ['span._D9W0'],
                acPath: ['_D9W0']
            }
        });
        expect(magicString.toString()).toEqual('<span ></span>');
    });

    it('<span ac-state={p0} ac-class="ll" class="ccc cc {CCC}"></span>', () => {
        const html = '<span ac-state={p0} ac-class="ll" class="ccc cc {CCC}"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({
            0: {
                name: 'span',
                state: '{p0}',
                props: {
                    class: {
                        t: ['ll'],
                    },
                },
                insert: 6,
                classes: 'ccc cc {CCC}',
                end: html.length,
                id: '_D9W0',
                elementPath: ['span._D9W0'],
                acPath: ['_D9W0']
            },
        });
        expect(magicString.toString()).toEqual('<span   ></span>');
    });

    it('<span ac-state={p0} class="ccc cc {CCC}" ac-default="ddd dd" ac-hover="hhh"></span>', () => {
        const html = '<span ac-state={p0} class="ccc cc {CCC}" ac-default="ddd dd" ac-hover="hhh"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({
            0: {
                name: 'span',
                state: '{p0}',
                props: {
                    default: {
                        t: ['ddd', 'dd'],
                    },
                    hover: {
                        t: ['hhh'],
                    },
                },
                insert: 6,
                classes: 'ccc cc {CCC}',
                end: html.length,
                id: '_D9W0',
                elementPath: ['span._D9W0'],
                acPath: ['_D9W0']
            },
        });
        expect(magicString.toString()).toEqual('<span    ></span>');
    });

    it('<span ac-state="{p0} {p1}" ac-default="ddd dd" ac-hover="hhh"></span>', () => {
        const html = '<span ac-state="{p0} {p1}" ac-default="ddd dd" ac-hover="hhh"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({
            0: {
                name: 'span',
                state: '{p0} {p1}',
                props: {
                    default: {
                        t: ['ddd', 'dd'],
                    },
                    hover: {
                        t: ['hhh'],
                    },
                },
                insert: 6,
                classes: undefined,
                end: html.length,
                id: '_D9W0',
                elementPath: ['span._D9W0'],
                acPath: ['_D9W0']
            },
        });
        expect(magicString.toString()).toEqual('<span   ></span>');
    });

    it('<div><span ac-default="ddd dd" ac-hover="hhh"></span></div>', () => {
        const html = '<div><span ac-default="ddd dd" ac-hover="hhh"></span></div>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({
            5: {
                name: 'span',
                state: undefined,
                props: {
                    default: {
                        t: ['ddd', 'dd'],
                    },
                    hover: {
                        t: ['hhh'],
                    },
                },
                insert: 11,
                classes: undefined,
                end: html.length - 6,
                id: '_D9W0',
                elementPath: ['div', 'span._D9W0'],
                acPath: ['_D9W0']
            },
        });
        expect(magicString.toString()).toEqual('<div><span  ></span></div>');
    });


    it('<span ac-id="aaa" ac-state={p0} class="ccc cc {CCC}" ac-default="ddd dd" ac-hover="hhh"></span>', () => {
        const html
            = '<span ac-id="aaa" ac-state={p0} class="ccc cc {CCC}" ac-default="ddd dd" ac-hover="hhh"></span>';
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({
            0: {
                name: 'span',
                state: '{p0}',
                props: {
                    default: {
                        t: ['ddd', 'dd'],
                    },
                    hover: {
                        t: ['hhh'],
                    },
                },
                insert: 6,
                classes: 'ccc cc {CCC}',
                end: html.length,
                id: 'aaa',
                elementPath: ['span.aaa'],
                acPath: ['aaa']
            },
        });
        expect(magicString.toString()).toEqual('<span     ></span>');
    });

});
