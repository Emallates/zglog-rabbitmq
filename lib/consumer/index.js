var m = {};
var _ = require('lodash');
var utils = require('../utils');

m.consume = function(qName, callback, conf) { 
	if(!this.conn) throw new Error("Please initialize first. Call init() first");
	if(typeof qName == 'function'){callback = qName; qName=null;}
	if(!callback) callback = _.noop;

	var _s = this;
	qName = qName || this.options.defQ;
	if(!this.options.Qs[qName] && qName != this.options.defQ) return callback("given queue is undefined");
	if(!this.options.read) return callback("Consume access denied");

	_s.getChanel(qName, function consumeMsg(err, chanel){
		if(err) return callback(err);
		chanel.consume(qName, function(msg){
			if (msg !== null){
				function sendAck(){ chanel.ack(msg); return _.noop; }
				callback(null, utils.parse(msg.content.toString()), _s.options.noAct ? sendAck() : sendAck);
				
			}else callback(null, null);
		}, conf);
	})	
};

module.exports = m;