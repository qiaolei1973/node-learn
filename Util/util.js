
var typeValidate = function (value) {
    let type = Object.prototype.toString.call(value);
    const strLen = type.length;
    type = type.substring(8, strLen - 1);
    return type.toLocaleLowerCase();
}

console.log("type: %s", typeValidate(Symbol('hahaha')));

exports = {
    typeValidate: typeValidate
};

console.log(exports);