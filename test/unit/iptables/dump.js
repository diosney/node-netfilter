var should = require('should');

var dump = require('../../../lib/iptables').dump;

module.exports = function () {
  describe('#dump', function () {
    it('should be defined', function () {
      should.exist(dump);
    });

    it('should throw an error when invoked without `options` argument', function () {
      dump.bind(null).should.throw();
    });

    describe('when executing with valid options', function () {
      // Resetting `iptables` state.
      afterEach(function (done) {
        dump(function (error) {
          if (error) {
            done(error);
            return;
          }
          done();
        });
      });
    });
  });
};