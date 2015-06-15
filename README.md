# node-netfilter

Packet filtering framework.

Wrapper around native **netfilter** suite to port its functionality to be used in the Node.js space.

## Installation

	$ npm install netfilter

## Supported functionality

- `iptables`    Administration tool for IPv4 packet filtering and NAT (among other capabilities).
- `ip6tables`   IPv6 packet filter administration (among other capabilities).
- `ipsets`      Administration tool for IP sets.

## Requirements

Basically the only system requirement is that the **netfilter** framework have to be present in your system, which almost
sure is installed by default in Linux based OSes.

Other requirement is about permission levels. To properly execute the provided methods the application that uses the
module must have the proper `sudo` privileges. One way to do it could be by adding a custom user to the system:

`sudo adduser --no-create-home netfilter`

then add its permissions at `/etc/sudoers` file:

`netfilter ALL=NOPASSWD: /sbin/iptables, /sbin/ip6tables, /sbin/ipset`

and then execute the commands with `sudo: true`:

	iptables.flush({
		sudo: true
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

## Issues

The source is available for download from [GitHub](https://github.com/diosney/node-netfilter)
and there is a [issue tracker](https://github.com/diosney/node-netfilter/issues) so you can report bugs there.

## Usage

The package is a collection of utilities that `netfilter` provides, such as `iptables` and `ip6tables`, among others.
You can get access to such utilities by issuing:

	var iptables = require('netfilter').iptables;

Besides, as a general rule of thumb, all the parameters identifiers are the same that `netfilter` provides, so you
can easily use the module with basic knowledge.

The specific utilities readme are located at:

- [README-iptables](https://github.com/diosney/node-netfilter/blob/master/docs/README-iptables.md)
- [README-ipset](https://github.com/diosney/node-netfilter/blob/master/docs/README-ipset.md)

## Concurrent commands

The **netfilter** suite sets a lock when a write operation is already in process, so concurrent
operations will fail if they hit the lock. To overcome this, a queueing system was implemented with
a default concurrency of one command at a time. If you ever needs to change the queue options or
increase the concurrent commands, you can add an `options.queue` parameter to the hash passed to the
command, like:

	iptables.new({
		queue: custom_queue,

		table: 'filter', // default: filter
		chain: 'new-user-chain',
	}, function (error) {
		if (error) {
			console.log(error);
		}
	});

This `custom_queue` must be a valid [process-queue](https://www.npmjs.org/package/process-queue) queue.

## Tests

To run the tests just execute:

	make test

and they will run. Note that you have to somehow execute the commands with `sudo` privileges.

**Important:** Some of the commands are destructive, like `flush` and `delete`, and since some tests
will try to clear all rules and/or chains, you have to be careful to not have important custom
rules and/or chains in the testing system if you don't want them to be removed.

## Contributing

Just maintain the overall code style and add or change the respective tests.

## License

The MIT License (MIT)

Copyright (c) 2013-2015 Diosney Sarmiento

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