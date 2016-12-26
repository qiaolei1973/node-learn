const o = {a:1,b:2,c:3,d:4};

const str = JSON.stringify(o,['a','b','c'],3);
console.log('stringfy:\n %s',str);