var exec = require('child_process').exec;

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
  exec(cmd.concat(args).join(' '), function (error, stdout, stderror) {
    if (error && cb) {
      cb({
        msg : stderror.split('\n')[0],
        cmd : cmd.concat(args).join(' '),
        code: error.code
      }, error.code);
    }
    else if (cb) {
      cb(null, 0);
    }
  });
};