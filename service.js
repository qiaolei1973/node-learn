var express = require('express');
var bodyParser = require('body-parser');
//处理编码格式为multipart/form-data的form文件
var formidable = require('formidable');

var app = express();

//app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true }))

 app.post('/ImportDataFromExcel', function(req,res){
    //  var file = req.body.user;
    //  debugger
    //  console.log(file);
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        debugger
        console.log('fields:',fields);
        console.log('files:',files);
    })
 });

app.listen(3000);
console.log('service start:3000');