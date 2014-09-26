var should = require('should');

var ipt_new = require('../../../lib/iptables').new;
var deleteChain = require('../../../lib/iptables').deleteChain;

module.exports = function () {
  describe('#new', function () {
    it('should be defined', function () {
      should.exist(ipt_new);
    });

    it('should throw an error when invoked without `options` argument', function () {
      ipt_new.bind(null).should.throw();
    });

    describe('when executing with valid options', function () {
      var chain_name;

      // Resetting `iptables` state.
      afterEach(function (done) {
        deleteChain({
          table: 'filter',
          chain: 'new-user-chain-' + chain_name
        }, function (error) {
          if (error) {
            done(error);
            return;
          }
          done();
        });
      });

      describe('with the full options', function () {
        it('should correctly add the new chain', function (done) {
          chain_name = Date.now();

          ipt_new({
            table: 'filter',
            chain: 'new-user-chain-' + chain_name
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
        it('should correctly add the new chain', function (done) {
          chain_name = Date.now();

          ipt_new({
            chain: 'new-user-chain-' + chain_name
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
      describe('without specifying `chain`', function () {
        it('should throw an error', function (done) {
          ipt_new({
            table: 'filter'
          }, function (error) {
            error.should.not.be.null;
            done();
          });
        });
      });
    });
  });
};