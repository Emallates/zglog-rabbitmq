var m = {};
var _ = require('../utils');

m.consume = function(qName, callback, conf) { 
	if(!this.options.canConsume) return callback("Consume access denied");
	if(!this.conn) throw new Error("Please initialize first. Call init() first");

	if(_.isFunction(qName)){callback = qName; qName=null;}
	callback = callback || _.noop;
	if( _.isObject)


	var _s = this;
	qName = qName || this.options.defaultQ;
	if(!this.options.Qs[qName] && qName != this.options.defaultQ) return callback("given queue is undefined");

	_s.getChanel(qName, function consumeMsg(err, chanel){
		if(err) return callback(err);
		chanel.consume(qName, function(msg){
			if (msg !== null){
				function sendAck(){ chanel.ack(msg); return _.noop; }
				callback(null, _.parse(msg.content.toString()), _s.options.noAct ? sendAck() : sendAck);
				
			}else callback(null, null);
		}, conf);
	})	
};

module.exports = m;