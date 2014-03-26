var exec = require('child_process').exec;

var tables = require('./utils').tables;

/**
 * Delete  the  optional user-defined chain specified.
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
	var cmd = ['iptables', '--table', table, '--delete-chain'];
	var args = [];

	/*
	 * Process options.
	 */
	if (typeof options.chain != 'undefined') {
		args = args.concat(options.chain);
	}

	/*
	 * Execute command.
	 */
	exec(cmd.concat(args).join(' '), function (error, stdout, stderror) {
		if (error && cb) {
			cb(stderror + ' Executed command line: ' + cmd.concat(args).join(' '));
		}
		else if (cb) {
			cb(null);
		}
	});
};