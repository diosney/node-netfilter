# node-netfilter

Packet filtering framework.

Wrapper around native **netfilter** suite to port its functionality to be used in Node.js space.

## Installation

	$ npm install netfilter

## Supported functionality

- `iptables`    Administration tool for IPv4 packet filtering and NAT (among other capabilities).
- `ip6tables`   IPv6 packet filter administration (among other capabilities).

## Requirements

Basically the only system requirement is that the **netfilter** framework to be present in your system, which is almost
sure is installed by default in Linux based OSes.

Other requirement is about permission levels. To properly execute the provided methods the application that uses the
module must have the proper `sudo` privileges.

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

- [README-iptables](https://github.com/diosney/node-netfilter/blob/master/README-iptables.md)
- [README-ipset](https://github.com/diosney/node-netfilter/blob/master/README-ipset.md)

## License

The MIT License (MIT)

Copyright (c) 2013 Diosney Sarmiento

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