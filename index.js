'use strict';
var _ = require('lodash');
var utils = require('./lib/utils');
var amqp = require('amqplib/callback_api');

module.exports = rmqManager

function rmqManager(opts) { opts = opts || {};
	var _s = this;
	if (!(_s instanceof rmqManager)) { return new rmqManager(opts); }
	_s.options={
		protocol:opts.host || 'amqp:',
		host:opts.host || opts.url || opts.ip || '127.0.0.1',
		write:opts.canPublish || false,
		defQ:opts.defaultQ || 'zglog-queue-default'
	};
	_s.options.url = _s.options.protocol+'//'+_s.options.host;
	_s.options.Qs = utils.getQs(opts.Qs || opts.qs || opts.queues);

	amqp.connect(_s.options.url, function(err, conn){
		if(err) throw err;
		_s.conn = conn;
	});
	return _s;
}

_.extend(
	rmqManager.prototype, 
	require('./lib/consumer'),
	require('./lib/publisher')
);

rmqManager.prototype.getChanel = function getNewChanel(q, callback){
	this.conn.createChannel(function(err, chanel){
		if(err) return callback(err);
		chanel.assertQueue(q);
		callback(null, chanel);
	});
}