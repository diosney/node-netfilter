var hasOwnProperty = require('has');
var exec = require('../child_utils').exec;
var shell_quote = require('shell-quote');

var tables = require('./utils').tables;

var MAPPED_ARGS = {
  '-A'      : '--append',
  '-D'      : '--delete',
  '-I'      : '--insert',
  '-R'      : '--replace',
  '-L'      : '--list',
  '-S'      : '--list-rules',
  '-F'      : '--flush',
  '-Z'      : '--zero',
  '-N'      : '--new-chain',
  '-X'      : '--delete-chain',
  '-P'      : '--policy',
  '-E'      : '--rename-chain',
  '-d'      : '--destination',
  '--dport' : '--destination-port',
  '--dports': '--destination-ports',
  '-i'      : '--in-interface',
  '-j'      : '--jump',
  '-f'      : '--fragment',
  '-g'      : '--goto',
  '-m'      : '--match',
  '-o'      : '--out-interface',
  '-p'      : '--protocol',
  '-s'      : '--source',
  '-t'      : '--table',
  '--sport' : '--source-port',
  '--sports': '--source-ports'
};

var MATCH_EXTENSIONS = [
  'addrtype',
  'ah',
  'cluster',
  'comment',
  'connbytes',
  'connlimit',
  'connmark',
  'conntrack',
  'dccp',
  'dscp',
  'ecn',
  'esp',
  'hashlimit',
  'helper',
  'iprange',
  'length',
  'limit',
  'mac',
  'mark',
  'multiport',
  'owner',
  'physdev',
  'pkttype',
  'policy',
  'quota',
  'rateest',
  'realm',
  'recent',
  'sctp',
  'set',
  'socket',
  'state',
  'statistic',
  'string',
  'tcpmss',
  'time',
  'tos',
  'ttl',
  'u32',
  'unclean'
];

var COMMON_ARGS = [
  'protocol',
  'jump',
  'goto',
  'source',
  'destination',
  'in-interface',
  'out-interface',
  'fragment'
];

/**
 * Print out all the rules in `iptables-save`.
 *
 * @param options
 * @param cb
 */
module.exports = function (/* options?, cb */) {
  var options;
  var cb;

  if (typeof arguments[0] == 'function') {
    options = {};
    cb = arguments[0];
  }
  else if (typeof arguments[0] == 'object'
    && typeof arguments[1] == 'function') {

    options = arguments[0];
    cb = arguments[1];
  }
  else {
    throw new Error('Invalid arguments. Signature: [options,] callback');
  }

  var table = options.table;

  var ipt_cmd = (options.sudo)
    ? 'sudo '
    : '';

  ipt_cmd += (options.ipv6)
    ? 'ip6tables-save'
    : 'iptables-save';

  /*
   * Build cmd to execute.
   */
  var cmd = [ipt_cmd];

  if (table) {
    cmd.push('--table', table);
  }
  var args = [];

  /*
   * Execute command.
   */
  exec(cmd.concat(args).join(' '), {queue: options.queue}, function (error, stdout, stderror) {
    if (error && cb) {
      var err = new Error(stderror.split('\n')[0]);
      err.cmd = cmd.concat(args).join(' ');
      err.code = error.code;

      cb(err);
      return;
    }

    if (cb) {
      var lines = String(stdout).split(/\n/g);
      var tables = Object.create(null);
      var chains = Object.create(null);
      var table = '';
      var chain = '';
      var policy = '';
      var rules = [];

      /**
       * Adds the processed contents to the current chain.
       * Procedure to save code lines.
       */
      function commit_chain() {
        if (chain === '') {
          return;
        }

        if (chains[chain]) {
          chains[chain].rules = chains[chain].rules.concat(rules);
        }
        else {
          chains[chain] = {
            policy: policy,
            rules : rules
          }
        }

        chain = '';
        policy = '';
        rules = [];
      }

      lines.forEach(function (line) {
        line = line.trim();

        if (line === 'COMMIT') {
          commit_chain();

          tables[table] = {
            chains: chains
          };

          table = '';
          chains = Object.create(null);
          return;
        }

        var c = line.charAt(0);

        if (c === '#') {
          return;
        }

        if (c === '*') {
          table = line.slice(1).trim();
          return;
        }

        if (c === ':') {
          commit_chain();

          var parts = /^:(\S+)\s+(\S+)/.exec(line);
          chain = parts[1];
          policy = parts[2];
          return;
        }

        var args = shell_quote.parse(line);
        var rule = Object.create(null);
        var negated = false;
        var option = '';
        var in_target = false;
        var match = null;
        var matches = Object.create(null);
        var target_options = null;
        var had_match = false;

        args.forEach(function (arg) {
          if (option === '') {
            arg = hasOwnProperty(MAPPED_ARGS, arg)
              ? MAPPED_ARGS[arg]
              : arg;

            if (arg.charAt(0) === '-') {
              option = arg.replace(/^[\-]+/, '');

              if (option === 'random') {
                rule.random = true;
                option = '';
              }
              else if (option === 'ports') {
                rule['source-ports'] = rule['source-ports'] || [];
                rule['destination-ports'] = rule['destination-ports'] || [];
              }
              else if (option === '--source-ports') {
                rule['source-ports'] = rule['source-ports'] || [];
              }
              else if (option === '--destination-ports') {
                rule['destination-ports'] = rule['destination-ports'] || [];
              }
            }
            else if (arg === '!') {
              negated = true;
            }
          }
          else {
            if (option === 'jump') {
              match = null;
              in_target = true;
            }

            var configure_target = rule;

            if (MATCH_EXTENSIONS.indexOf(option) !== -1) {
              had_match = true;
              matches[option] = match = Object.create(null);
              option = '';
              negated = false;
              return;
            }

            if (COMMON_ARGS.indexOf(option) === -1) {
              // Little bit wonky to detect if target_options was used.
              if (in_target) {
                configure_target = target_options || (target_options = Object.create(null));
              }
              else {
                configure_target = match;
              }
            }

            if (option === 'match' || option === 'protocol') {
              had_match = true;
              matches[arg] = match = matches[arg] || Object.create(null);
              option = '';
              negated = false;
            }
            else if (option === 'append') {
              if (arg != chain) {
                commit_chain();
              }

              chain = arg;
              option = '';
              negated = false;
            }
            else if (option === 'ports') {
              configure_target['source-ports'].push(arg);
              configure_target['destination-ports'].push(arg);
              option = '';
              negated = false;
            }
            else {
              var val = negated
                ? '!' + arg
                : arg;

              if (Array.isArray(rule[option])) {
                configure_target[option].push(val);
              }
              else {
                configure_target[option] = val;
              }

              option = '';
              negated = false;
            }
          }
        });

        if (had_match) {
          rule.matches = matches;
        }

        if (target_options != null) {
          rule.target_options = target_options;
        }

        rules.push(rule);
      });

      cb(null, tables);
    }
  });
};
