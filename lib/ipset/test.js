var exec = require('../child_utils').exec;

/**
 * Test wether an entry is in a set or not.
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
  var cmd = [ipset_cmd, 'ipset', 'test'];
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
  if (typeof options['test_options'] != 'undefined') {
    for (var i in options['test_options']) {
      if (options['test_options'].hasOwnProperty(i)) {
        args = args.concat(i, options['test_options'][i]);
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

      cb(err, error.code);
    }
    else if (cb) {
      cb(null, 0);
    }
  });
};
