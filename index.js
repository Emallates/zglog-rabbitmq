'use strict';
var _ = require('./lib/utils');
var amqp = require('amqplib/callback_api');

module.exports = rmqManager

function rmqManager(opts) { opts = opts || {};
	var _s = this;
	if (!(_s instanceof rmqManager)) { return new rmqManager(opts); }


	_s.options = _.assignIn({
		/* optional opts */
		// port:5672,
		// protocol:'amqp',
		// hostname:'127.0.0.1',
		
		username:'admin',
		password:'admin',

		noAct: false,
		retryTime:5000,
		canPublish:true,
		canConsume:true,
		defaultQ:'zglog-queue-default'
	}, opts);

	_s.options.Qs = _.getQs(opts.Qs || opts.qs || opts.queues);

	_s.init();
	return _s;
}

_.extend(
	rmqManager.prototype,
	require('./lib/consumer'),
	require('./lib/publisher')
);

rmqManager.prototype.init = function (callback){
	try{
		var _s = this;
		if(_s.conn) return callback(null, true);
		amqp.connect(_s.options, function(err, conn){
			if(err) throw err;
			_s.conn = conn;
			if(_s.timer) clearInterval(_s.timer);

			_s.conn.on("error", function (err) {
				_s.timer = setInterval(_s.init, _.options.retryTime);
			})
			// "error", function(e) { log(e); setInterval(restart, 5000); 
			if(callback) callback(null, true);
		});		
	}catch(exp){
		if(callback) callback(exp);
	}
}
rmqManager.prototype.getChanel = function getNewChanel(q, callback){
	this.conn.createChannel(function(err, chanel){
		if(err) return callback(err);
		chanel.assertQueue(q);
		callback(null, chanel);
	});
}