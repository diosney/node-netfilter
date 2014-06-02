var exec = require('child_process').exec;

/**
 * Flush all entries from the specified set or flush all sets if none is given.
 *
 * @param options
 * @param cb
 */
module.exports = function (/* options?, cb */) {
  var options;
  var cb;

  if (typeof arguments[0] == 'function') {
    options = {};
    cb = arguments[0];
  }
  else if (typeof arguments[0] == 'object'
    && typeof arguments[1] == 'function') {

    options = arguments[0];
    cb = arguments[1];
  }
  else {
    throw new Error('Invalid arguments. Signature: [options,] callback');
  }

  /*
   * Build cmd to execute.
   */
  var cmd = ['ipset', 'flush'];
  var args = [];

  /*
   * Process options.
   */
  if (typeof options.setname != 'undefined') {
    args = args.concat(options.setname);
  }

  /*
   * Execute command.
   */
  exec(cmd.concat(args).join(' '), function (error, stdout, stderror) {
    if (error && cb) {
      cb({
        msg : stderror.split('\n')[0],
        cmd : cmd.concat(args).join(' '),
        code: error.code
      });
    }
    else if (cb) {
      cb(null);
    }
  });
};