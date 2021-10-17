import UniqueId from './unique-id';

describe('UniqueId', () => {

    it('UniqueId Case 0', () => {
        const u = new UniqueId();
        let id = u.get({a : 199});
        expect(id).toEqual('CVJQ');
        const id0 = u.get({a : 1});
        const id1 = u.get({a : 1});
        expect(id0).not.toEqual(id1);
    });

    it('UniqueId Case 1', () => {
        const u = new UniqueId({prefix: 'ac'});
        let id = u.get({a : 199});
        expect(id).toEqual('NKTW');
    });

});
