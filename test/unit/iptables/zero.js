var should = require('should');

var zero = require('../../../lib/iptables').zero;

module.exports = function () {
  describe('#zero', function () {
    it('should be defined', function () {
      should.exist(zero);
    });

    it('should throw an error when invoked without `options` argument', function () {
      zero.bind(null).should.throw();
    });

    describe('when executing with valid options', function () {
      describe('without specifying the chain', function () {
        it('should resets all chains', function (done) {
          zero({
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
        it('should resets `FORWARD` chain', function (done) {
          zero({
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