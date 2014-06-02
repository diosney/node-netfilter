### ipset - Administration tool for IP sets.

	var ipset = require('netfilter').ipset;

#### `ipset` **official manual**: [http://ipset.netfilter.org/ipset.man.html](http://ipset.netfilter.org/ipset.man.html)

#### Create

	ipset.create({
		setname:  'foo',
		typename: 'bitmap:ip',

		'create-options': {
			range:  '192.168.0.0/16'
		}
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

#### Add

	// ipset create foo bitmap:ip range 192.168.0.0/16

	ipset.add({
		setname:  'foo',

		'add-entry':  '192.168.1/24'

		'add-options': {
			range:  '192.168.0.0/16'
		}
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

#### Version

	ipset.version(function (error, version) {
		if (error) {
			console.log(error);
		}
		else {
			console.log(version);
		}
	});