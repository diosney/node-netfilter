var processQueue = require('process-queue');

var default_queue = processQueue.createQueue({concurrency:1});

exports.exec = function (line, opts, cb) {
  var stdout, stdout_length, stderr, stderr_length;

  // avoid allocation
  if (cb) {
    stdout = [];
    stdout_length = 0;
    stderr = [];
    stderr_length = 0;
  }

  var child;
  var queue = opts.queue || default_queue;
  if (cb) {
    queue = queue.wrap({
      child: function (spawned_child, next) {
        child = spawned_child;
        if (cb) {
          child.stdout.on('data', function (data) {
            if (!Buffer.isBuffer(data)) data = new Buffer(data);
            stdout_length += data.length;
            stdout.push(data);
          });
          child.stderr.on('data', function (data) {
            if (!Buffer.isBuffer(data)) data = new Buffer(data);
            stderr_length += data.length;
            stderr.push(data);
          });
        }
        next(null, child);
      }
    });
  }
  var cmd = {
    spawnOptions: ['sh', ['-c', 'exec ' + line]]
  };
  function onFinish(err) {
    if (!cb) return;
    if (!child) {
      cb(new Error('there was a problem spawning the child process'));
      return;
    }
    if (err) {
      err.killed = child.killed;
      err.code = child.exitCode;
      err.signal = child.signalCode;
    } 
    cb(err,
       stdout_length ? String(Buffer.concat(stdout, stdout_length)) : '',
       stderr_length ? String(Buffer.concat(stderr, stderr_length)) : ''
    );
  }
  queue.push(cmd, onFinish);

  // cleanup for gc
  cmd = null;
}
