var events = require('events');

var proxy = new events.EventEmitter();
var status = 'ready';

//var fn = function(fn){}

var process = function(callback){
    proxy.once('event1',callback);
    if(status === 'ready'){
        status = 'pending';
    }
}