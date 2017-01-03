var render = function (str, data) {
    var tpl = str.replace(/<%=([\s\S]+?)%>/g, function (match, code) {
        return "' + obj." + code + "+ '";
    })
    tpl = "var tpl = '" + tpl + "'\nreturn tpl";
    var complied = new Function('obj',tpl);
    return complied(data); 
}

var tpl = 'hello <%=name%>';
var tem = render(tpl,{name:'world'});
console.log(tem);