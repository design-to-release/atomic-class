import getPropName from './get-prop-name';

describe('getPropName', () => {
    
    it('option[default, null]', () => {
        expect(getPropName("default", null)).toEqual("default");
    });

    it('option[ac-default, "ac"]', () => {
        expect(getPropName("ac-default", "ac")).toEqual("default");
    });

    it('option[ac-default, "dc"]', () => {
        expect(getPropName("ac-default", "dc")).toEqual(undefined);
    });

});
  