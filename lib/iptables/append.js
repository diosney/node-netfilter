var exec = require('child_process').exec;

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