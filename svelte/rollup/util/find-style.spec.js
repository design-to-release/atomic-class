import findStyle from './find-style';

describe('Find Style', () => {

    it('Find Style Case 1', () => {
        const html = '<script></script> <style></style>';
        const rs = findStyle(html);
        expect(rs).toEqual([ { start: 18, content: '<style></style>', innerHTML: '', offset: 7 } ]);
    });
    it('Find Style Case 2', () => {
        const html = '<script></script> <style lang="scss">aa</style>';
        const rs = findStyle(html);
        expect(rs).toEqual([ { start: 18, content: '<style lang="scss">aa</style>', innerHTML: 'aa', offset: 7 + ' lang="scss"'.length } ]);
    });

    it('Find Style Case 3', () => {
        const html = '<script></script> <style></style> <style>.aa{}</style>';
        const rs = findStyle(html);
        expect(rs).toEqual([
            {
              start: 18,
              content: '<style></style>',
              innerHTML: '.aa{}',
              offset: 23
            },
            {
              start: 34,
              content: '<style>.aa{}</style>',
              innerHTML: '.aa{}',
              offset: 7
            }
          ]);
    });

});
