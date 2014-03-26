var exec = require('child_process').exec;

var tables = require('./utils').tables;

/**
 * Zero the packet and byte counters.
 *
 * @param options
 * @param cb
 */
module.exports = function (/* options?, cb */) {
	var options;
	var cb;

	if (typeof arguments[0] == 'function') {
		options = {};
		cb = arguments[0];
	}
	else if (typeof arguments[0] == 'object'
		&& typeof arguments[1] == 'function') {

		options = arguments[0];
		cb = arguments[1];
	}
	else {
		throw new Error('Invalid arguments. Signature: [options,] callback');
	}

	var table = (typeof options.table != 'undefined')
		? options.table
		: tables.filter;

	/*
	 * Build cmd to execute.
	 */
	var cmd = ['iptables', '--table', table, '--zero'];
	var args = [];

	/*
	 * Process options.
	 */
	if (typeof options.chain != 'undefined') {
		args = args.concat(options.chain);
	}

	if (typeof options.rulenum != 'undefined') {
		args = args.concat(options.rulenum);
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