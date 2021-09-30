export default function (name, prefix) {
    let rs;
    if (prefix) {
        let reg = name.match(new RegExp(`^${prefix}-([^)]+)`));
        if (reg && reg[1]) {
            rs = reg[1];
        }
    }
    else {
        rs = name;
    }
    return rs;
}