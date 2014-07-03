var exec = require('child_process').exec;

/**
 * Print program version.
 *
 * @param cb
 */
module.exports = function (cb) {
  if (typeof arguments[0] != 'function') {
    throw new Error('Invalid arguments. Signature: (callback)');
  }

  var ipset_cmd = (options.sudo)
    ? 'sudo'
    : '';

  /*
   * Build cmd to execute.
   */
  var cmd = [ipset_cmd, 'ipset', 'version'];

  /*
   * Execute command.
   */
  exec(cmd.join(' '), function (error, stdout, stderror) {
    if (error && cb) {
      var err = new Error(stderror.split('\n')[0]);
      err.cmd = cmd.concat(args).join(' ');
      err.code = error.code;

      cb(err);
    }
    else if (cb) {
      cb(null, stdout.split('\n')[0]);
    }
  });
};