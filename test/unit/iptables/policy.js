var should = require('should');

var policy = require('../../../lib/iptables').policy;

module.exports = function () {
  describe('#policy', function () {
    it('should be defined', function () {
      should.exist(policy);
    });

    it('should throw an error when invoked without `options` argument', function () {
      policy.bind(null).should.throw();
    });

    describe('when executing with valid options', function () {
      // Resetting `iptables` state.
      afterEach(function (done) {
        policy({
          table : 'filter',
          chain : 'FORWARD',
          target: 'ACCEPT'
        }, function (error) {
          if (error) {
            done(error);
            return;
          }
          done();
        });
      });

      describe('with the full options', function () {
        it('should correctly sets the default policy', function (done) {
          policy({
            table : 'filter',
            chain : 'FORWARD',
            target: 'DROP'
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
        it('should correctly sets the default policy', function (done) {
          policy({
            chain : 'FORWARD',
            target: 'DROP'
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

    describe('when executing with invalid options', function () {
      describe('without specifying `chain` and `policy`', function () {
        it('should throw an error', function (done) {
          policy({
            table : 'filter',
            target: 'DROP'
          }, function (error) {
            error.should.not.be.null;
            done();
          });
        });
      });
    });
  });
};