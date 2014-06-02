var exec = require('child_process').exec;

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

	/*
	 * Build cmd to execute.
	 */
	var cmd = ['ipset', 'add', '-exist'];
	var args = [];

	/*
	 * Process options.
	 */
	if (typeof options.setname != 'undefined') {
		args = args.concat(options.setname);
	}

	if (typeof options['add-entry'] != 'undefined') {
		args = args.concat(options['add-entry']);
	}

	/*
	 * An array of {key: value} pair.
	 */
	if (typeof options['add-options'] != 'undefined') {
		for (var i in options['add-options']) {
			if (options['add-options'].hasOwnProperty(i)) {
				args = args.concat(i, options['add-options'][i]);
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