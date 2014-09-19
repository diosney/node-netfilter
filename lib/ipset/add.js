var exec = require('../child_utils').exec;

/**
 * Add a given entry to the set.
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
  var cmd = [ipset_cmd, 'ipset', 'add', '-exist'];
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
  if (typeof options['add_options'] != 'undefined') {
    for (var i in options['add_options']) {
      if (options['add_options'].hasOwnProperty(i)) {
        args = args.concat(i, options['add_options'][i]);
      }
    }
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
