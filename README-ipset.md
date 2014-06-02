### ipset - Administration tool for IP sets.

	var ipset = require('netfilter').ipset;

#### `ipset` **official manual**: [http://ipset.netfilter.org/ipset.man.html](http://ipset.netfilter.org/ipset.man.html)

#### Create

	ipset.create({
		setname:  'foo',
		type   :  'bitmap:ip',
		create_options: {
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
		entry  :  '192.168.1/24'
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

#### Del

	ipset.del({
		setname:  'foo',
		entry   : '192.168.1/24'
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

#### Test

	ipset.test({
		setname:  'foo',
		entry  :  '192.168.1.1'
	}, function (error, code) {
		if (error) {
			// Is not in the set.
			console.log(error);
		}
		else if (code == 0) {
			// Is in the set.
		}
	});

#### Destroy

Destroy all ipsets.

	ipset.destroy(function (error, code) {
		if (error) {
			console.log(error);
		}
	});

Destroy ipset with name `foo`.

	ipset.destroy({
		setname:  'foo'
	}, function (error, code) {
		if (error) {
			console.log(error);
		}
	});

#### Flush

Flush all ipsets.

	ipset.flush(function (error, code) {
		if (error) {
			console.log(error);
		}
	});

Flush ipset with name `foo`.

	ipset.flush({
		setname:  'foo'
	}, function (error, code) {
		if (error) {
			console.log(error);
		}
	});

#### Rename

	ipset.rename({
		'from'  :  'foo',
		'to'    :  'foo2'
	}, function (error, code) {
		if (error) {
			console.log(error);
		}
	});

#### Swap

	ipset.swap({
		'from'  :  'foo',
		'to'    :  'foo2'
	}, function (error, code) {
		if (error) {
			console.log(error);
		}
	});