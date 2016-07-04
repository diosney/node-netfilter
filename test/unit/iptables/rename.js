var should = require('should');

var rename = require('../../../lib/iptables').rename;
var ipt_new = require('../../../lib/iptables').new;
var deleteChain = require('../../../lib/iptables').deleteChain;

module.exports = function () {
  describe('#rename', function () {
    it('should be defined', function () {
      should.exist(rename);
    });

    it('should throw an error when invoked without `options` argument', function () {
      rename.bind(null).should.throw();
    });

    describe('when executing with valid options', function () {
      var old_chain_name;
      var new_chain_name;

      // Resetting `iptables` state.
      beforeEach(function (done) {
        ipt_new({
          table: 'filter',
          chain: 'old-chain-name-' + old_chain_name
        }, function (error) {
          if (error) {
            done(error);
            return;
          }
          done();
        });
      });

      // Resetting `iptables` state.
      afterEach(function (done) {
        deleteChain({
          table: 'filter',
          chain: 'new-chain-name-' + new_chain_name
        }, function (error) {
          if (error) {
            done(error);
            return;
          }
          done();
        });
      });

      describe('with the full options', function () {
        it('should correctly sets the default rename', function (done) {
          new_chain_name = Date.now();

          rename({
            table   : 'filter',
            old_name: 'old-chain-name-' + old_chain_name,
            new_name: 'new-chain-name-' + new_chain_name
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
        it('should correctly sets the default rename', function (done) {
          new_chain_name = Date.now();

          rename({
            old_name: 'old-chain-name-' + old_chain_name,
            new_name: 'new-chain-name-' + new_chain_name
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
      describe('without specifying `old_name` and `new_name`', function () {
        it('should throw an error', function (done) {
          rename({
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