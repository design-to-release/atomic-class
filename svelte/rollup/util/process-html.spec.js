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
        expect(rs).toEqual({0: {names: ['p0'], props: {}, import: undefined, insert: 6}});
        expect(magicString.toString()).toEqual(`<span ></span>`);
    });

    it('<span ac-props={p0} class="ccc cc {CCC}"></span>', () => {
        const html = `<span ac-props={p0} class="ccc cc {CCC}"></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({
            0: {
                names: ['p0'],
                props: {
                    base: {
                        classes: "ccc cc",
                    },
                },
                import: undefined,
                insert: 6
            }
        });
        expect(magicString.toString()).toEqual(`<span  class="{CCC}"></span>`);
    });

    it('<span ac-props={p0} class="ccc cc {CCC}" ac-default="ddd dd" ac-hover="hhh"></span>', () => {
        const html = `<span ac-props={p0} class="ccc cc {CCC}" ac-default="ddd dd" ac-hover="hhh"></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({
            0: {
                names: ['p0'],
                props: {
                    base: {
                        classes: "ccc cc",
                    },
                    default: {
                        classes: "ddd dd",
                    },
                    hover: {
                        classes: "hhh",
                    }
                },
                import: undefined,
                insert: 6
            }
        });
        expect(magicString.toString()).toEqual(`<span  class="{CCC}"  ></span>`);
    });

    it('<span ac-props="{p0} {p1}" ac-default="ddd dd" ac-hover="hhh"></span>', () => {
        const html = `<span ac-props="{p0} {p1}" ac-default="ddd dd" ac-hover="hhh"></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({
            0: {
                names: ['p0', 'p1'],
                props: {
                    default: {
                        classes: "ddd dd",
                    },
                    hover: {
                        classes: "hhh",
                    }
                },
                import: undefined,
                insert: 6
            }
        });
        expect(magicString.toString()).toEqual(`<span   ></span>`);
    });


    it('<span ac-import={ac.xx} ac-props={p0} class="ccc cc {CCC}" ac-default="ddd dd" ac-hover="hhh"></span>', () => {
        const html = `<span ac-import={ac.xx} ac-props={p0} class="ccc cc {CCC}" ac-default="ddd dd" ac-hover="hhh"></span>`;
        const magicString = new MagicString(html);
        const node = parse(magicString.toString()).html;
        const rs = processHtml(node, magicString, 'ac');
        expect(rs).toEqual({
            0: {
                names: ['p0'],
                props: {
                    base: {
                        classes: "ccc cc",
                    },
                    default: {
                        classes: "ddd dd",
                    },
                    hover: {
                        classes: "hhh",
                    }
                },
                import: 'xx',
                insert: 6
            }
        });
        expect(magicString.toString()).toEqual(`<span   class="{CCC}"  ></span>`);
    });

});
  