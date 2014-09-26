var exec = require('../child_utils').exec;

var tables = require('./utils').tables;
var processCommonRuleSpecs = require('./utils').processCommonRuleSpecs;


/**
 * Append  one  or  more  rules  to  the  end of the selected chain.
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
  var cmd = [ipt_cmd, '--table', table, '--append'];
  var args = [];

  /*
   * Process options.
   */
  if (typeof options.chain != 'undefined') {
    args = args.concat(options.chain);
  }

  var common_rule_specs = processCommonRuleSpecs(options);
  args = args.concat(common_rule_specs);

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
