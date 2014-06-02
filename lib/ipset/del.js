var exec = require('child_process').exec;

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

  /*
   * Build cmd to execute.
   */
  var cmd = ['ipset', 'del', '-exist'];
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
      if (options['del_options'].hasOwnProperty(i)) {
        args = args.concat(i, options['del_options'][i]);
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
      });
    }
    else if (cb) {
      cb(null);
    }
  });
};