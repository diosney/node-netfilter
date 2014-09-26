module.exports = [
  {
    options: {
      protocol       : 'tcp',
      source         : '!10.10.10.0/24',
      destination    : '11.11.11.0/24',
      'in-interface' : 'eth0',
      'out-interface': 'eth1',

      matches: {
        cluster: {
          'cluster-total-nodes': 2,
          'cluster-local-node' : 1,
          'cluster-hash-seed'  : '0xdeadbeef'
        },
        comment: {
          comment: 'Some comment.'
        }
      },

      jump          : 'AUDIT',
      target_options: {
        type: 'drop'
      }
    },

    args: [
      '--protocol',
      'tcp',
      '!',
      '--source',
      '10.10.10.0/24',
      '--destination',
      '11.11.11.0/24',
      '--in-interface',
      'eth0',
      '--out-interface',
      'eth1',
      '--match',
      'cluster',
      '--cluster-total-nodes',
      '2',
      '--cluster-local-node',
      '1',
      '--cluster-hash-seed',
      '0xdeadbeef',
      '--match',
      'comment',
      '--comment',
      'Some comment.',
      '--jump',
      'AUDIT',
      '--type',
      'drop'
    ]
  }
];