var exec = require('../child_utils').exec;

var tables = require('./utils').tables;

/**
 * Delete  the  optional user-defined chain specified.
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

  var ipt_cmd = (options.sudo)
    ? 'sudo '
    : '';

  ipt_cmd += (options.ipv6)
    ? 'ip6tables'
    : 'iptables';

  /*
   * Build cmd to execute.
   */
  var cmd = [ipt_cmd, '--table', table, '--delete-chain'];
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
  exec(cmd.concat(args).join(' '), {queue: options.queue}, function (error, stdout, stderror) {
    if (error && cb) {
      var err = new Error(stderror.split('\n')[0]);
      err.cmd = cmd.concat(args).join(' ');
      err.code = error.code;

      cb(err);
    }
    else if (cb) {
      cb(null);
    }
  });
};