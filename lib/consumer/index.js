var m = {};
var _ = require('lodash');
var utils = require('../utils');

m.consume = function(qName, callback) { 
	if(typeof qName == 'function'){callback = qName; qName=null;}
	if(!callback) callback = _.noop;

	var _s = this;
	qName = qName || this.options.defQ;
	_s.getChanel(qName, function consumeMsg(err, chanel){
		if(err) return callback(err);
		chanel.consume(qName, function(msg){
			if (msg !== null){
				callback(null, utils.parse(msg.content.toString()));
				chanel.ack(msg);
			}else callback(null, null);
		});
	})	
};

module.exports = m;