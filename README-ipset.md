### ipset - Administration tool for IP sets.

	var ipset = require('netfilter').ipset;

#### `ipset` **official manual**: [http://ipset.netfilter.org/ipset.man.html](http://ipset.netfilter.org/ipset.man.html)

#### Create

	ipset.create({
		set:  'foo',
		type: 'bitmap:ip',

		options: {
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