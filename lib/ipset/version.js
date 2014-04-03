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

	/*
	 * Build cmd to execute.
	 */
	var cmd = ['ipset', 'version'];

	/*
	 * Execute command.
	 */
	exec(cmd.join(' '), function (error, stdout, stderror) {
		if (error && cb) {
			cb({
				msg : stderror.split('\n')[0],
				cmd : cmd.concat(args).join(' '),
				code: error.code
			});
		}
		else if (cb) {
			cb(null, stdout.split('\n')[0]);
		}
	});
};