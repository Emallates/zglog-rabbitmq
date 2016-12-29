var m = {};
var _ = require('lodash');
var utils = require('../utils');

m.publish = function(msg, qName, callback){
	if(!this.options.canPublish) return callback("Publish access denied");
	
	if(!this.conn) throw new Error("Please initialize first. Call init() first");
	if(typeof qName == 'function'){callback = qName; qName=null;}
	if(!callback) callback = _.noop;
	qName = qName || this.options.defaultQ;
	if(!this.options.Qs[qName] && qName != this.options.defaultQ) return callback("given queue is undefined");
	
	msg = utils.stringify(msg);
	this.getChanel(qName, function publishMsg(err, chanel){
		if(err) return callback(err);
		chanel.sendToQueue(qName, new Buffer(msg));
		callback(null, true);
	})	
};

module.exports = m;