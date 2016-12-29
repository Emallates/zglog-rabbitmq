var manager = require('../');
manager = new manager({
	defaultQ:"zlogjs-rabbitmq-defQ",
	noAck:true,
	canPublish:true,
	canConsume:true,
	qs:['normal','errors']//'normal' || ['normal','errors'] || {normal:1, errors:1}	
});
// console.log(manager);
setTimeout(function(){
	manager.publish("Message string", /*'testQ',*/ console.log);
	manager.consume(function(err, msg, done){
		console.log('err', err);
		console.log('msg', msg);
		// done();
	});
}, 100);
