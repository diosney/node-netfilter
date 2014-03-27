var exec = require('child_process').exec;

var tables = require('./utils').tables;

/**
 * Rename the user specified chain to the user supplied name.
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

	var ipt_cmd = (options.ipv6)
		? 'ip6tables'
		: 'iptables';

	/*
	 * Build cmd to execute.
	 */
	var cmd = [ipt_cmd, '--table', table, '--rename-chain'];
	var args = [];

	/*
	 * Process options.
	 */
	if (typeof options.old_name != 'undefined') {
		args = args.concat(options.old_name);
	}

	if (typeof options.new_name != 'undefined') {
		args = args.concat(options.new_name);
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