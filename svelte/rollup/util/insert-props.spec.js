import insertProps from './insert-props';
import MagicString from 'magic-string';
import { parse } from 'svelte/compiler';


describe('insertProps', () => {

    it('case.1', () => {
        const script = `<script>
            let p0;
        </script>`;
        const configs = {
            0: {
                names: ['p0'],
                props: {base: 'bbb', default: 'ddd dd'},
                insert: 6,
                import: undefined,
            }
        }
        const magicString = new MagicString(script);
        const node = parse(magicString.toString()).instance;
        insertProps(magicString, node, 'ac', configs);
        const rs = magicString.toString().replace(/(\<(\/)*script\>)/g, '');
        const fn = Function(rs+ ';return p0;');
        expect(fn()).toEqual({ base: 'bbb', default: 'ddd dd' });
    });

    it('case.2', () => {
        const script = `<script>
            let p0 = {base: 'aaa', hover: 'hhh'};
        </script>`;
        const configs = {
            0: {
                names: ['p0'],
                props: {base: 'bbb', default: 'ddd dd'},
                insert: 6,
                import: undefined,
            }
        }
        const magicString = new MagicString(script);
        const node = parse(magicString.toString()).instance;
        insertProps(magicString, node, 'ac', configs);
        const rs = magicString.toString().replace(/(\<(\/)*script\>)/g, '');
        const fn = Function(rs+ ';return p0;');
        expect(fn()).toEqual({ base: 'bbb', default: 'ddd dd', hover: 'hhh'});
    });

    it('case.3', () => {
        const script = `<script>
            let p0 = {base: 'aaa', hover: 'hhh'};
        </script>`;
        const configs = {
            0: {
                names: ['p0'],
                props: {base: 'bbb', default: 'ddd dd'},
                insert: 6,
                import: 'one',
            }
        }
        const magicString = new MagicString(script);
        const node = parse(magicString.toString()).instance;
        insertProps(magicString, node, 'ac', configs);
        const rs = magicString.toString().replace(/(\<(\/)*script\>)/g, '');
        const fn = Function('ac', rs + ';return p0;');
        expect(fn({one: {base: 'ppp', hover: 'ooo'}})).toEqual({ base: 'ppp', default: 'ddd dd', hover: 'ooo'});
    });



    it('case.4', () => {
        const script = `<script>
            $: p0;
        </script>`;
        const configs = {
            0: {
                names: ['p0'],
                props: {base: 'bbb', default: 'ddd dd'},
                insert: 6,
                import: undefined,
            }
        }
        const magicString = new MagicString(script);
        const node = parse(magicString.toString()).instance;
        insertProps(magicString, node, 'ac', configs);
        const rs = magicString.toString().replace(/(\<(\/)*script\>)/g, '').replace('$:', 'let');
        const fn = Function(rs+ ';return p0;');
        expect(fn()).toEqual({ base: 'bbb', default: 'ddd dd' });
    });

    it('case.5', () => {
        const script = `<script>
            $: p0 = {base: 'aaa', hover: 'hhh'};
        </script>`;
        const configs = {
            0: {
                names: ['p0'],
                props: {base: 'bbb', default: 'ddd dd'},
                insert: 6,
                import: undefined,
            }
        }
        const magicString = new MagicString(script);
        const node = parse(magicString.toString()).instance;
        insertProps(magicString, node, 'ac', configs);
        const rs = magicString.toString().replace(/(\<(\/)*script\>)/g, '').replace('$:', 'let');
        const fn = Function(rs+ ';return p0;');
        expect(fn()).toEqual({ base: 'bbb', default: 'ddd dd', hover: 'hhh'});
    });

    it('case.6', () => {
        const script = `<script>
            $: p0 = {base: 'aaa', hover: 'hhh'};
        </script>`;
        const configs = {
            0: {
                names: ['p0'],
                props: {base: 'bbb', default: 'ddd dd'},
                insert: 6,
                import: 'one',
            }
        }
        const magicString = new MagicString(script);
        const node = parse(magicString.toString()).instance;
        insertProps(magicString, node, 'ac', configs);
        const rs = magicString.toString().replace(/(\<(\/)*script\>)/g, '').replace('$:', 'let');
        const fn = Function('ac', rs + ';return p0;');
        expect(fn({one: {base: 'ppp', hover: 'ooo'}})).toEqual({ base: 'ppp', default: 'ddd dd', hover: 'ooo'});
    });


});