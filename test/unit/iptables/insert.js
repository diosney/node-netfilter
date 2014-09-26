var should = require('should');

var insert = require('../../../lib/iptables').insert;
var flush = require('../../../lib/iptables').flush;

module.exports = function () {
  describe('#insert', function () {
    it('should be defined', function () {
      should.exist(insert);
    });

    it('should throw an error when invoked without `options` argument', function () {
      insert.bind(null).should.throw();
    });

    describe('when executing with valid options', function () {
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

      describe('with the full options', function () {
        it('should correctly insert the rule', function (done) {
          insert({
            table         : 'filter',
            chain         : 'FORWARD',
            rulenum       : 1,
            protocol      : 'tcp',
            source        : '!10.10.10.0/24',
            destination   : '11.11.11.0/24',
            matches       : {
              comment: {
                comment: '"Some comment."'
              }
            },
            jump          : 'AUDIT',
            target_options: {
              type: 'drop'
            }
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
        it('should correctly add the insert chain', function (done) {
          insert({
            chain         : 'FORWARD',
            rulenum       : 1,
            protocol      : 'tcp',
            source        : '!10.10.10.0/24',
            destination   : '11.11.11.0/24',
            matches       : {
              comment: {
                comment: '"Some comment."'
              }
            },
            jump          : 'AUDIT',
            target_options: {
              type: 'drop'
            }
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
          insert({
            rulenum       : 1,
            protocol      : 'tcp',
            source        : '!10.10.10.0/24',
            destination   : '11.11.11.0/24',
            matches       : {
              comment: {
                comment: '"Some comment."'
              }
            },
            jump          : 'AUDIT',
            target_options: {
              type: 'drop'
            }
          }, function (error) {
            error.should.not.be.null;
            done();
          });
        });
      });
    });
  });
};