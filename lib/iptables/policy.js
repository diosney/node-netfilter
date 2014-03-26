var exec = require('child_process').exec;

var tables = require('./utils').tables;

/**
 * Set the policy for the chain to the given target.
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

	/*
	 * Build cmd to execute.
	 */
	var cmd = ['iptables', '--table', table, '--policy'];
	var args = [];

	/*
	 * Process options.
	 */
	if (typeof options.chain != 'undefined') {
		args = args.concat(options.chain);
	}

	if (typeof options.target != 'undefined') {
		args = args.concat(options.target);
	}

	/*
	 * Execute command.
	 */
	exec(cmd.concat(args).join(' '), function (error, stdout, stderror) {
		if (error && cb) {
			cb({
				msg: stderror.split('\n')[0],
				cmd: cmd.concat(args).join(' ')
			});
		}
		else if (cb) {
			cb(null);
		}
	});
};