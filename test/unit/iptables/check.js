var should = require('should');

var check = require('../../../lib/iptables').check;
var append = require('../../../lib/iptables').append;
var flush = require('../../../lib/iptables').flush;

module.exports = function () {
  describe('#check', function () {
    it('should be defined', function () {
      should.exist(check);
    });

    it('should throw an error when invoked without `options` argument', function () {
      check.bind(null).should.throw();
    });

    describe('when executing with valid options', function () {
      beforeEach(function (done) {
        append({
          table      : 'filter',
          chain      : 'FORWARD',
          protocol   : 'tcp',
          destination: '11.11.11.0/24',
          matches    : {
            comment: {
              comment: '"Some comment."'
            }
          },
          jump       : 'DROP'
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
        flush(function (error) {
          if (error) {
            done(error);
            return;
          }
          done();
        });
      });

      describe('and the rule is in the chain', function () {
        it('its exit code should be 0', function (done) {
          check({
            table      : 'filter',
            chain      : 'FORWARD',
            protocol   : 'tcp',
            destination: '11.11.11.0/24',
            matches    : {
              comment: {
                comment: '"Some comment."'
              }
            },
            jump       : 'DROP'
          }, function (error) {
            if (error) {
              done(error);
              return;
            }
            done();
          });
        });
      });

      describe('and the rule is in the chain without specifying `table`', function () {
        it('should correctly delete the rule', function (done) {
          check({
            chain      : 'FORWARD',
            protocol   : 'tcp',
            destination: '11.11.11.0/24',
            matches    : {
              comment: {
                comment: '"Some comment."'
              }
            },
            jump       : 'DROP'
          }, function (error) {
            if (error) {
              done(error);
              return;
            }
            done();
          });
        });
      });

      describe('and the rule is not in the chain', function () {
        it('its exit code should be 1', function (done) {
          check({
            table      : 'filter',
            chain      : 'OUTPUT',
            protocol   : 'udp',
            destination: '12.12.12.0/24',
            matches    : {
              comment: {
                comment: '"Some other comment."'
              }
            },
            jump       : 'ACCEPT'
          }, function (error) {
            error.should.not.be.null;
            done();
          });
        });
      });
    });

    describe('when executing with invalid options', function () {
      describe('without specifying `chain`', function () {
        it('should throw an error', function (done) {
          check({
            protocol   : 'tcp',
            destination: '11.11.11.0/24',
            matches    : {
              comment: {
                comment: '"Some comment."'
              }
            },
            jump       : 'DROP'
          }, function (error) {
            error.should.not.be.null;
            done();
          });
        });
      });
    });
  });
};