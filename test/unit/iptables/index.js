var should = require('should');

var iptables = require('../../../index').iptables;

var supported_methods = [
  'utils',
  'policy',
  'new',
  'rename',
  'deleteChain',
  'zero',
  'flush',
  'append',
  'delete',
  'insert',
  'replace',
  'dump',
  'check'
];

describe('iptables', function () {
  it('should be defined', function () {
    should.exist(iptables);
  });

  it('should export the supported commands & utils', function () {
    iptables.should.have.properties(supported_methods);
  });

  /*
   * Load respective command tests.
   */
  supported_methods.forEach(function (method) {
    require('./' + method)();
  });

  // TODO: Add global options tests, like IPv6 and concurrency support.
});