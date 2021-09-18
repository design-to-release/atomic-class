import processHtml from './process-html';
import MagicString from 'magic-string';
import { parse } from 'svelte/compiler';


describe('processNode', () => {

    it('<span ></span>', () => {
        const html = `<span ></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({});
        expect(magicString.toString()).toEqual(`<span ></span>`);
    });

    it('<span ac-props={p0}></span>', () => {
        const html = `<span ac-props={p0}></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({p0: {}});
        expect(magicString.toString()).toEqual(`<span ></span>`);
    });

    it('<span ac-props={p0} class="ccc cc {CCC}"></span>', () => {
        const html = `<span ac-props={p0} class="ccc cc {CCC}"></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({
            p0: {
                base: {
                    classes: "ccc cc",
                },
            }
        });
        expect(magicString.toString()).toEqual(`<span  class="{CCC}"></span>`);
    });

    it('<span ac-props={p0} class="ccc cc {CCC}" ac-default="ddd dd" ac-hover-ol="hhh"></span>', () => {
        const html = `<span ac-props={p0} class="ccc cc {CCC}" ac-default="ddd dd" ac-hover-ol="hhh"></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({
            p0: {
                base: {
                    classes: "ccc cc",
                },
                default: {
                    classes: "ddd dd",
                    overlap: false,
                },
                hover: {
                    classes: "hhh",
                    overlap: true,
                }
            }
        });
        expect(magicString.toString()).toEqual(`<span  class="{CCC}"  ></span>`);
    });

    it('<span ac-props="{p0} {p1}" ac-default="ddd dd" ac-hover-ol="hhh"></span>', () => {
        const html = `<span ac-props="{p0} {p1}" ac-default="ddd dd" ac-hover-ol="hhh"></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({
            p0: {
                default: {
                    classes: "ddd dd",
                    overlap: false,
                },
                hover: {
                    classes: "hhh",
                    overlap: true,
                }
            },
            p1: {
                default: {
                    classes: "ddd dd",
                    overlap: false,
                },
                hover: {
                    classes: "hhh",
                    overlap: true,
                }
            }
        });
        expect(magicString.toString()).toEqual(`<span   ></span>`);
    });

});
  