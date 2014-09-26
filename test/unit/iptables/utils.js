var should = require('should');

var utils = require('../../../lib/iptables/utils');
var fixtures = require('./fixtures/utils.processCommonRuleSpecs');

describe('iptables', function () {
  describe('#utils', function () {
    it('should be defined', function () {
      should.exist(utils);
    });

    describe('#tables{}', function () {
      it('should be defined', function () {
        should.exist(utils.tables);
      });

      it('should have its already known properties', function () {
        utils.tables.should.have.properties(
          {
            filter  : 'filter',
            nat     : 'nat',
            mangle  : 'mangle',
            raw     : 'raw',
            security: 'security'
          });
      });
    });

    describe('#processCommonRuleSpecs()', function () {
      it('should be defined', function () {
        should.exist(utils.processCommonRuleSpecs);
      });

      describe('when seed with several options', function () {
        it('should return a correct array representation of those options', function () {
          for (var i = 0, j = fixtures.length;
               i < j;
               i++) {

            var common_rule_specs = utils.processCommonRuleSpecs(fixtures[i].options);
            common_rule_specs.should.be.eql(fixtures[i].args);
          }
        });
      });
    });
  });
});