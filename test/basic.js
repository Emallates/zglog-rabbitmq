var manager = require('../');
manager = new manager({
	defaultQ:"inputs",
	qs:['normal','errors']//'normal' || ['normal','errors'] || {normal:1, errors:1}	
});
// console.log(manager);
setTimeout(function(){
	manager.publish("Nauman Ramzan", /*'testQ',*/ console.log);
	manager.consume(console.log);
}, 100);
