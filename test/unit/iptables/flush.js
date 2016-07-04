var should = require('should');

var flush = require('../../../lib/iptables').flush;

module.exports = function () {
  describe('#flush', function () {
    it('should be defined', function () {
      should.exist(flush);
    });

    it('should throw an error when invoked without `options` argument', function () {
      flush.bind(null).should.throw();
    });

    describe('when executing with valid options', function () {
      describe('without specifying the chain', function () {
        it('should flush all chains', function (done) {
          flush({
            table: 'filter'
          }, function (error) {
            if (error) {
              done(error);
              return;
            }
            done();
          });
        });
      });

      describe('without specifying `table`', function () {
        it('should flush `FORWARD` chain', function (done) {
          flush({
            chain: 'FORWARD'
          }, function (error) {
            if (error) {
              done(error);
              return;
            }
            done();
          });
        });
      });
    });
  });
};