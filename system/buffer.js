
var fs = require('fs');

var str = '用来测试buffer.';
var buf = new Buffer(str, 'utf-8');
console.log(buf);

//buffer拼接
// const PATH = './read.md';

// const rs = fs.createReadStream(PATH, { highWaterMark: 11 });
// rs.setEncoding('utf-8');
// let data = '';
// rs.on('data', function (chunk) {
//     data += chunk;
// })
// rs.on('end', function () {
//     console.log(data);
// })

const PATH = './read.md';
let
    chunks = [],
    size = 0;

const rs = fs.createReadStream(PATH, { highWaterMark: 11 });
rs.setEncoding('utf-8');

rs.on('data', function (chunk) {
    chunks.push(chunk);
    size += chunk.length;
})
rs.on('end', function () {
    console.log(chunks instanceof Array);
    let
        buff = Buffer.concat(chunks, size),
        str = iconv.decode(buff, 'utf8');
    console.log(str);
})