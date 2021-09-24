import processExtraCss from './process-extra-class';


describe('processExtraCss', () => {

    it('extraCss = false', () => {
        const configs = {0: {
            names: ['p0'],
            props: { base: { classes: ""}, default: { classes: "bg-gray"} },
            import: 'xx',
            insert: 6,
        }};
        const rs = processExtraCss(configs, false, 'ac');
        expect(rs).toEqual({0: {
            names: ['p0'],
            props: { base: { classes: ""}, default: { classes: "bg-gray"} },
            import: 'xx',
            insert: 6,
        }});
    });

    it('extraCss 1', () => {
        const configs = {0: {
            names: ['p0'],
            props: { base: { classes: ""}, default: { classes: "bg-gray"} },
            import: 'xx',
            insert: 6,
        }};
        const rs = processExtraCss(configs, true, 'ac');
        expect(rs).toEqual({0: {
            names: ['p0'],
            props: { base: { classes: "ac-xx"}, default: { classes: "bg-gray"} },
            import: 'xx',
            insert: 6,
        }});
    });

    it('extraCss 2', () => {
        const configs = {0: {
            names: ['p0'],
            props: { base: { classes: "acc"}, default: { classes: "bg-gray"} },
            import: 'xx',
            insert: 6,
        }};
        const rs = processExtraCss(configs, true, 'ac');
        expect(rs).toEqual({0: {
            names: ['p0'],
            props: { base: { classes: "ac-xx acc"}, default: { classes: "bg-gray"} },
            import: 'xx',
            insert: 6,
        }});
    });

    it('extraCss 3', () => {
        const configs = {0: {
            names: ['p0', 'p1'],
            props: { base: { classes: "acc"}, default: { classes: "bg-gray"} },
            import: 'xx',
            insert: 6,
        }, 20: {
            names: ['3'],
            props: { base: { classes: ""}, default: { classes: "bg-gray"} },
            import: undefined,
            insert: 6,
        }};
        const rs = processExtraCss(configs, true, 'ac');
        expect(rs).toEqual({0: {
            names: ['p0', 'p1'],
            props: { base: { classes: "ac-xx acc"}, default: { classes: "bg-gray"} },
            import: 'xx',
            insert: 6,
        }, 20: {
            names: ['3'],
            props: { base: { classes: ""}, default: { classes: "bg-gray"} },
            import: undefined,
            insert: 6,
        }});
    });

});
  