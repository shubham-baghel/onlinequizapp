export function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

Array.prototype.remove = function remove(...forDeletion) {
    return this.filter(item => !forDeletion.includes(item));
}