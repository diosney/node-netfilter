http://ipset.netfilter.org/iptables.man.html

Error codes
-----------
The wrapper error codes matches (unsurprisingly) the same as iptables. They are:

- 0 - Correct functioning (so its an exit code, not an error).
- 1 - Other errors.
- 2 - Caused by invalid or abused command line parameters.


Policy
------
	iptables.policy({
		table: 'filter', // default: filter
		chain: 'FORWARD',
		target:'ACCEPT'
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

New
---
	iptables.new({
		table: 'filter', // default: filter
		chain: 'new-user-chain'
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

Rename
------
	iptables.rename({
		table: 'filter', // default: filter
		old_name: 'old-chain-name',
		new_name: 'new-chain-name'
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

Delete Chain/s
--------------
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

Zero
----
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

Flush
-----
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

Append
------
	iptables.append({
		table: 'filter', // default: filter
		chain: 'chain-name',

		protocol:        'tcp',
		source:          '10.10.10.0/24',
		destination:     '11.11.11.0/24',
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

Delete
------
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

        protocol:        'tcp',
        source:          '10.10.10.0/24',
        destination:     '11.11.11.0/24',
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

Insert
------
	iptables.insert({
        table:      'filter', // default: filter
        chain:      'chain-name',
        rulenum:    4,

        protocol:        'tcp',
        source:          '10.10.10.0/24',
        destination:     '11.11.11.0/24',
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

## Release notes

### 0.1.0

- Added initial `iptables` & `ip6tables` support.

## License

The MIT License (MIT)

Copyright (c) 2013,2014 Diosney Sarmiento

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.