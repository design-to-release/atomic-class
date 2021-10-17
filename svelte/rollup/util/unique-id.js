import shortHash from "shorthash2";

export default class UnquieId {
    constructor(options) {
        this.existed = {};
        this.prefix = options?.prefix || '';
    }
    get(object, prefix) {
        const oid = JSON.stringify(object).replace(/[\{\}\"\:]/g, "");
        const id = shortHash((prefix || this.prefix) + oid).toUpperCase().substr(-4);
        if(this.existed[id]) {
            return this.get(object, (prefix || this.prefix) + '0');
        }
        this.existed[id] = true;
        return id;
    }
}