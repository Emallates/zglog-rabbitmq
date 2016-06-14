var _u = {};
var _ = require('lodash')
_u.getQs = function getQueues(val) {
	if(_.isUndefined(val)) throw new Error('Usage: queue(s) are required');
	var obj = {};
	if(_.isString(val)) obj[val] = val;
	if(_.isArray(val)) obj = _.zipObject(val, val);
	else if(_.isObject(val)) obj = val;
	return obj;
}

_u.parse = function(val){ return JSON.parse(val); }
_u.stringify = function(val){ return JSON.stringify(val); }


module.exports = _u;