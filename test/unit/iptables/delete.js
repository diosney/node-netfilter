var should = require('should');

var append = require('../../../lib/iptables').append;
var deleteRule = require('../../../lib/iptables').delete;

module.exports = function () {
  describe('#delete', function () {
    it('should be defined', function () {
      should.exist(deleteRule);
    });

    it('should throw an error when invoked without `options` argument', function () {
      deleteRule.bind(null).should.throw();
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

      describe('with the full options', function () {
        it('should correctly delete the rule', function (done) {
          deleteRule({
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

      describe('without specifying `table`', function () {
        it('should correctly delete the rule', function (done) {
          deleteRule({
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
    });

    describe('when executing with invalid options', function () {
      describe('without specifying `chain`', function () {
        it('should throw an error', function (done) {
          deleteRule({
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