
var events = require('events');
var emitter = new events.EventEmitter();

emitter.on('event1',function(msg){
    console.log(msg);
})

emitter.emit('event1','message');