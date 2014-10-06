var exec = require('../child_utils').exec;
var hasOwnProperty = require('has');

/**
 * Delete an entry from a set.
 *
 * @param options
 * @param cb
 */
module.exports = function (options, cb) {
  if (typeof arguments[0] != 'object') {
    throw new Error('Invalid arguments. Signature: (options, callback?)');
  }

  var ipset_cmd = (options.sudo)
    ? 'sudo'
    : '';

  /*
   * Build cmd to execute.
   */
  var cmd = [ipset_cmd, 'ipset', 'del', '-exist'];
  var args = [];

  /*
   * Process options.
   */
  if (typeof options.setname != 'undefined') {
    args = args.concat(options.setname);
  }

  if (typeof options['entry'] != 'undefined') {
    args = args.concat(options['entry']);
  }

  /*
   * An array of {key: value} pair.
   */
  if (typeof options['del_options'] != 'undefined') {
    for (var i in options['del_options']) {
      if (hasOwnProperty(options['del_options'], i)) {
        args = args.concat(i, options['del_options'][i]);
      }
    }
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
