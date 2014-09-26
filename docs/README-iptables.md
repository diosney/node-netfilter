### iptables / ip6tables - IPv{4|6} packet filter administration

	var iptables = require('netfilter').iptables;

#### `iptables` **official manual**: [http://ipset.netfilter.org/iptables.man.html](http://ipset.netfilter.org/iptables.man.html)

You can switch between the IPv4 and the IPv6 versions of the command by adding/removing the `ipv6` flag in the passed
in options:

	iptables.flush({
		ipv6: true
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

#### Error codes

The wrapper error codes matches (unsurprisingly) the same as iptables. They are:

- 0 - Correct functioning (so its an exit code, not an error).
- 1 - Other errors.
- 2 - Caused by invalid or abused command line parameters.


#### Policy

	iptables.policy({
		table: 'filter', // default: filter
		chain: 'FORWARD',
		target:'ACCEPT'
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

#### New

	iptables.new({
		table: 'filter', // default: filter
		chain: 'new-user-chain'
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

#### Rename

	iptables.rename({
		table: 'filter', // default: filter
		old_name: 'old-chain-name',
		new_name: 'new-chain-name'
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

#### Delete Chain/s

	iptables.deleteChain(function (error) {
		if (error) {
			console.log(error);
		}
	});

	iptables.deleteChain({
		table: 'filter', // default: filter
		chain: 'chain-name'
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

#### Zero

	iptables.zero(function (error) {
		if (error) {
			console.log(error);
		}
	});

	iptables.zero({
		table: 'filter', // default: filter
		chain: 'chain-name',
		rulenum: 4
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

#### Flush

	iptables.flush(function (error) {
		if (error) {
			console.log(error);
		}
	});

	iptables.flush({
		table: 'filter', // default: filter
		chain: 'chain-name'
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

#### Append

	iptables.append({
		table: 'filter', // default: filter
		chain: 'chain-name',

		protocol:		'tcp',
		source:		  '10.10.10.0/24',
		destination:	 '11.11.11.0/24',
		'in-interface':  'eth0',
		'out-interface': 'eth1',

		matches: {
			addrtype:{
				'src-type': '!BLACKHOLE'
			},

			cluster: {
				'cluster-total-nodes': 2,
				'cluster-local-node':  1,
				'cluster-hash-seed':   '0xdeadbeef'
			}
		},

		jump: 'AUDIT',
		target_options: {
			type: 'drop'
		}
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

#### Delete

	iptables.delete({
		table:   'filter', // default: filter
		chain:   'chain-name',
		rulenum: 1
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

	iptables.delete({
		table: 'filter', // default: filter
		chain: 'chain-name',

		protocol:		'tcp',
		source:		  '10.10.10.0/24',
		destination:	 '11.11.11.0/24',
		'in-interface':  'eth0',
		'out-interface': 'eth1',

		matches: {
			addrtype:{
				'src-type': '!BLACKHOLE'
			},

			cluster: {
				'cluster-total-nodes': 2,
				'cluster-local-node':  1,
				'cluster-hash-seed':   '0xdeadbeef'
			}
		},

		jump: 'AUDIT',
		target_options: {
			type: 'drop'
		}
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

#### Insert & Replace

	iptables.replace({
		table:	  'filter', // default: filter
		chain:	  'chain-name',
		rulenum:	4,

		protocol:		'tcp',
		source:		  '10.10.10.0/24',
		destination:	 '11.11.11.0/24',
		'in-interface':  'eth0',
		'out-interface': 'eth1',

		matches: {
			addrtype:{
				'src-type': '!BLACKHOLE'
			},

			cluster: {
				'cluster-total-nodes': 2,
				'cluster-local-node':  1,
				'cluster-hash-seed':   '0xdeadbeef'
			}
		},

		jump: 'AUDIT',
		target_options: {
			type: 'drop'
		}
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

#### Dump

	iptables.dump({
		 table: 'nat', // default: null == all
	}, function(error, dump) {
		if (error) {
			console.log(error);
			return;
		}

		for (var table_name in dump) {
			var table_dump = dump[table];

			for (var chain_name in table_dump.chains) {
				var chain_dump = table_dump.chains[chain_name];
				console.log(table_name, chain_name, chain_dump);
			}
		}
	});