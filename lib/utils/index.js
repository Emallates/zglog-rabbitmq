var zlError = require('../Errors')

var _ = require('lodash').assign({}, require('lodash'), require('util'));

_.isObject = function (obj) { return Object.prototype.toString.call(obj) == '[object Object]'; }

_.getQs = function getQueues(val) {
	if(_.isUndefined(val)) throw new zlError('Usage: queue(s) are required');
	var obj = {};
	if(_.isString(val)) obj[val] = val;
	if(_.isArray(val)) obj = _.zipObject(val, val);
	else if(_.isObject(val)) obj = val;
	return obj;
}

_.parse = function(val){ return JSON.parse(val); }
_.stringify = require('json-stringify-safe') || function(val){ return JSON.stringify(val); }


module.exports = _;