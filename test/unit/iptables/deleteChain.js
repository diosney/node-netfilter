var should = require('should');

var ipt_new = require('../../../lib/iptables').new;
var deleteChain = require('../../../lib/iptables').deleteChain;

module.exports = function () {
  describe('#deleteChain', function () {
    it('should be defined', function () {
      should.exist(deleteChain);
    });

    it('should throw an error when invoked without arguments', function () {
      deleteChain.bind(null).should.throw();
    });

    describe('when executing without specifying the chain', function () {
      // Resetting `iptables` state.
      before(function (done) {
        ipt_new({
          table: 'filter',
          chain: 'chain-name-' + Date.now()
        }, function (error) {
          if (error) {
            done(error);
            return;
          }
          done();
        });
      });

      it('should correctly delete all chains', function (done) {
        deleteChain({
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

    describe('when executing with valid options', function () {
      var chain_name;

      // Resetting `iptables` state.
      beforeEach(function (done) {
        chain_name = Date.now();

        ipt_new({
          table: 'filter',
          chain: 'chain-name-' + chain_name
        }, function (error) {
          if (error) {
            done(error);
            return;
          }
          done();
        });
      });

      describe('with the full options', function () {
        it('should correctly delete the specified chain', function (done) {
          deleteChain({
            table: 'filter',
            chain: 'chain-name-' + chain_name
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
        it('should correctly delete the specified chain', function (done) {
          deleteChain({
            chain: 'chain-name-' + chain_name
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