import insertClasses from './insert-classes';
import MagicString from 'magic-string';


describe('insertClasses', () => {

    it('insertClasses 1', () => {
        const configs = {0: {
            state: '{p0}',
            props: {default: {t: 'bg-gray'}},
            insert: 6,
            classes: '{xx}'
        }};
        const content = new MagicString('<span ></span>');
        const rs = insertClasses(null, content, configs);
        expect(rs.toString()).toEqual('<span class="{p0} {xx}" ></span>');
    });

    it('insertClasses 2', () => {
        const configs = {0: {
            state: '{p0}',
            props: {class: {t: ['acc']}, default: {t: ['bg-gray']}},
            insert: 6,
            classes: undefined
        }};
        const content = new MagicString('<span ></span>');
        const rs = insertClasses(null, content, configs);
        expect(rs.toString()).toEqual('<span class="{p0} acc" ></span>');
    });

    it('insertClasses 3', () => {
        const configs = {0: {
            id: '_AAA',
            state: '{p0}',
            props: {class: {t: ['acc']}, default: {t: ['bg-gray']}},
            insert: 6,
            classes: undefined
        }};
        const content = new MagicString('<span ></span>');
        const rs = insertClasses(null, content, configs);
        expect(rs.toString()).toEqual('<span class="_AAA {p0} acc" ></span>');
    });

    it('insertClasses 4', () => {
        const configs = {0: {
            state: '{p0}',
            props: {class: {t: ['acc']}, default: {t: ['bg-gray']}},
            insert: 6,
            classes: undefined
        },14: {
            state: '{p1}',
            props: {class: {t: ['acc']}, default: {t: ['bg-gray']}},
            insert: 20,
            classes: '{yy0}'
        }};
        const content = new MagicString('<span ></span><span ></span>');
        const rs = insertClasses(null, content, configs);
        expect(rs.toString()).toEqual('<span class="{p0} acc" ></span><span class="{p1} {yy0} acc" ></span>');
    });


});
