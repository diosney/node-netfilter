var exec = require('child_process').exec;

var tables = require('./utils').tables;

/**
 * Flush the selected chain (all the chains in the table if none is given).
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

  var table = (typeof options.table != 'undefined')
    ? options.table
    : tables.filter;

  var ipt_cmd = (options.ipv6)
    ? 'ip6tables'
    : 'iptables';

  /*
   * Build cmd to execute.
   */
  var cmd = [ipt_cmd, '--table', table, '--flush'];
  var args = [];

  /*
   * Process options.
   */
  if (typeof options.chain != 'undefined') {
    args = args.concat(options.chain);
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