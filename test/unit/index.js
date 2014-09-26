var should = require('should');

var index = require('../../index');

describe('index', function () {
  it('should be defined', function () {
    should.exist(index);
  });

  it('should contain `iptables` reference', function () {
    index.iptables.should.exist;
  });

  it('should contain `ipset` reference', function () {
    index.ipset.should.exist;
  });
});