var exec = require('../child_utils').exec;

var tables = require('./utils').tables;

/**
 * Set the policy for the chain to the given target.
 *
 * @param options
 * @param cb
 */
module.exports = function (options, cb) {
  if (typeof arguments[0] != 'object') {
    throw new Error('Invalid arguments. Signature: (options, callback?)');
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
  var cmd = [ipt_cmd, '--table', table, '--policy'];
  var args = [];

  /*
   * Process options.
   */
  if (typeof options.chain != 'undefined') {
    args = args.concat(options.chain);
  }

  if (typeof options.target != 'undefined') {
    args = args.concat(options.target);
  }

  /*
   * Execute command.
   */
  exec(cmd.concat(args).join(' '), {queue: options.cmdQueue}, function (error, stdout, stderror) {
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
