import insertClasses from './insert-classes';
import MagicString from 'magic-string';


describe('insertClasses', () => {

    it('extraCss = false', () => {
        const configs = {0: {
            names: ['p0'],
            props: {base: {classes: ''}, default: {classes: 'bg-gray'}},
            import: 'xx',
            insert: 6,
            classes: '{xx}'
        }};
        const content = new MagicString('<span ></span>');
        const rs = insertClasses(null, content, configs, 'ac', false);
        expect(rs.toString()).toEqual('<span class="{xx}" ></span>');
    });

    it('extraCss 1', () => {
        const configs = {0: {
            names: ['p0'],
            props: {base: {classes: ''}, default: {classes: 'bg-gray'}},
            import: 'xx',
            insert: 6,
            classes: '{xx}'
        }};
        const content = new MagicString('<span ></span>');
        const rs = insertClasses(null, content, configs, 'ac', true);
        expect(rs.toString()).toEqual('<span class="ac-xx {xx}" ></span>');
    });

    it('extraCss 2', () => {
        const configs = {0: {
            names: ['p0'],
            props: {base: {classes: 'acc'}, default: {classes: 'bg-gray'}},
            import: 'xx',
            insert: 6,
            classes: undefined
        }};
        const content = new MagicString('<span ></span>');
        const rs = insertClasses(null, content, configs, 'ac', false);
        expect(rs.toString()).toEqual('<span ></span>');
    });

    it('extraCss 2', () => {
        const configs = {0: {
            names: ['p0'],
            props: {base: {classes: 'acc'}, default: {classes: 'bg-gray'}},
            import: 'xx',
            insert: 6,
            classes: undefined
        }};
        const content = new MagicString('<span ></span>');
        const rs = insertClasses(null, content, configs, 'ac', true);
        expect(rs.toString()).toEqual('<span class="ac-xx" ></span>');
    });

    it('extraCss 3', () => {
        const configs = {0: {
            names: ['p0'],
            props: {base: {classes: 'acc'}, default: {classes: 'bg-gray'}},
            import: 'xx',
            insert: 6,
            classes: undefined
        },14: {
            names: ['p1'],
            props: {base: {classes: 'acc'}, default: {classes: 'bg-gray'}},
            import: 'yy',
            insert: 20,
            classes: '{yy0}'
        }};
        const content = new MagicString('<span ></span><span ></span>');
        const rs = insertClasses(null, content, configs, 'ac', true);
        expect(rs.toString()).toEqual('<span class="ac-xx" ></span><span class="ac-yy {yy0}" ></span>');
    });


});
