import separateMustache from './separate-mustache';
import { parse } from 'svelte/compiler';

describe('separateMustache', () => {
    
    it('props={data}', () => {
        const attribute = parse(`<span props={data}></span>`).html.children[0].attributes[0];
        const { strings, expressions } = separateMustache(attribute);
        expect(strings).toEqual([]);
        expect(expressions).toEqual(['data']);
    });

    it('props="{data}"', () => {
        const attribute = parse(`<span props="{data}"></span>`).html.children[0].attributes[0];
        const { strings, expressions } = separateMustache(attribute);
        expect(strings).toEqual([]);
        expect(expressions).toEqual(['data']);
    });

    it('props="kk {data}"', () => {
        const attribute = parse(`<span props="kk {data}"></span>`).html.children[0].attributes[0];
        const { strings, expressions } = separateMustache(attribute);
        expect(strings).toEqual(["kk"]);
        expect(expressions).toEqual(['data']);
    });

    it('props="kk {data} {ss} aa"', () => {
        const attribute = parse(`<span props="kk {data} {ss} aa"></span>`).html.children[0].attributes[0];
        const { strings, expressions } = separateMustache(attribute);
        expect(strings).toEqual(["kk", "aa"]);
        expect(expressions).toEqual(['data', "ss"]);
    });

    it('props="string"', () => {
        const attribute = parse(`<span props="string" ></span>`).html.children[0].attributes[0];
        const { strings, expressions } = separateMustache(attribute);
        expect(strings).toEqual(["string"]);
        expect(expressions).toEqual([]);
    });
});
  