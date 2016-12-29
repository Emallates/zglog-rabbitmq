/**
 * Custom error for ZlogJS-rabbitMQ component
 * @param  {String} message Error message
 */
function zlogError(message) {
  this.message = message;
  Error.captureStackTrace(this, zlogError);
}

require('util').inherits(zlogError, Error);
zlogError.prototype.name = 'ZLogJS-rabbitMQ:Error ';

module.exports = zlogError;