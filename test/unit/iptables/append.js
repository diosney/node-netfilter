var should = require('should');

var append = require('../../../lib/iptables').append;
var flush = require('../../../lib/iptables').flush;

module.exports = function () {
  describe('#append', function () {
    it('should be defined', function () {
      should.exist(append);
    });

    it('should throw an error when invoked without `options` argument', function () {
      append.bind(null).should.throw();
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
        it('should correctly append the rule', function (done) {
          append({
            table         : 'filter',
            chain         : 'FORWARD',
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
        it('should correctly add the append chain', function (done) {
          append({
            chain         : 'FORWARD',
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
          append({
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