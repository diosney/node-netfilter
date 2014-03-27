var exec = require('child_process').exec;

var tables = require('./utils').tables;

/**
 * Append  one  or  more  rules  to  the  end of the selected chain.
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
	var cmd = ['iptables', '--table', table, '--append'];
	var args = [];

	/*
	 * Process options.
	 */
	if (typeof options.chain != 'undefined') {
		args = args.concat(options.chain);
	}

	if (typeof options.protocol != 'undefined') {
		if (options.protocol.split('!').length > 1) {
			args = args.concat('! --protocol', options.protocol.split('!')[1]);
		}
		else {
			args = args.concat('--protocol', options.protocol);
		}
	}

	if (typeof options.source != 'undefined') {
		if (options.source.split('!').length > 1) {
			args = args.concat('! --source', options.source.split('!')[1]);
		}
		else {
			args = args.concat('--source', options.source);
		}
	}

	if (typeof options.destination != 'undefined') {
		if (options.destination.split('!').length > 1) {
			args = args.concat('! --destination', options.destination.split('!')[1]);
		}
		else {
			args = args.concat('--destination', options.destination);
		}
	}

	if (typeof options['in-interface'] != 'undefined') {
		if (options['in-interface'].split('!').length > 1) {
			args = args.concat('! --in-interface', options['in-interface'].split('!')[1]);
		}
		else {
			args = args.concat('--in-interface', options['in-interface']);
		}
	}

	if (typeof options['out-interface'] != 'undefined') {
		if (options['out-interface'].split('!').length > 1) {
			args = args.concat('! --out-interface', options['out-interface'].split('!')[1]);
		}
		else {
			args = args.concat('--out-interface', options['out-interface']);
		}
	}

	if (typeof options.fragment != 'undefined') {
		if (options.fragment.split('!').length > 1) {
			args = args.concat('! --fragment');
		}
		else {
			args = args.concat('--fragment');
		}
	}

	/*
	 * Matches processing.
	 */
	if (typeof options.matches != 'undefined') {
		for (var match in options.matches) {
			if (options.matches.hasOwnProperty(match)) {
				// Initial match load.
				args = args.concat('--match', match);

				// Specific match options.
				var this_match = options.matches[match];

				for (var match_option in this_match) {
					if (this_match.hasOwnProperty(match_option)) {
						if (typeof this_match[match_option] == 'string'
							&& this_match[match_option].split('!').length > 1) {

							args = args.concat('! --' + match_option, this_match[match_option].split('!')[1]);
						}
						else {
							args = args.concat('--' + match_option, this_match[match_option]);
						}
					}
				}
			}
		}
	}

	if (typeof options.goto != 'undefined') {
		args = args.concat('--goto', options.goto);
	}

	if (typeof options.jump != 'undefined') {
		args = args.concat('--jump', options.jump);

		// Target extension options.
		if (typeof options.target_options != 'undefined') {
			for (var target_option in options.target_options) {
				if (options.target_options.hasOwnProperty(target_option)) {
					args = args.concat('--' + target_option, options.target_options[target_option]);
				}
			}
		}
	}

	/*
	 * Execute command.
	 */
	exec(cmd.concat(args).join(' '), function (error, stdout, stderror) {
		if (error && cb) {
			console.log(error)

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