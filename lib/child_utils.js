var process_queue = require('process-queue');

var default_queue = process_queue.createQueue({
  concurrency: 1
});

/**
 * Wrapper around native `child_process.exec()` method to add queue capabilities.
 *
 * @param {String}    line      Command line to be executed.
 * @param {Object}    options   Options to be passed to the underlying method, f.e.: options.queue.
 * @param {Function}  cb        Callback function to be executed after command execution is completed.
 */
exports.exec = function (line, options, cb) {
  var stdout, stdout_length, stderr, stderr_length;
  var child;
  var queue = options.queue || default_queue;

  if (cb) {
    // Avoid allocation.
    stdout = [];
    stdout_length = 0;
    stderr = [];
    stderr_length = 0;

    queue = queue.wrap({
      child: function (spawned_child, next) {
        child = spawned_child;

        if (cb) {
          child.stdout.on('data', function (data) {
            if (!Buffer.isBuffer(data)) {
              data = new Buffer(data);
            }
            stdout_length += data.length;
            stdout.push(data);
          });

          child.stderr.on('data', function (data) {
            if (!Buffer.isBuffer(data)) {
              data = new Buffer(data);
            }
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

  function onFinish(error) {
    if (!cb) {
      return;
    }

    if (!child) {
      cb(new Error('There was a problem spawning the child process.'));
      return;
    }

    if (error) {
      error.killed = child.killed;
      error.code = child.exitCode;
      error.signal = child.signalCode;
    }

    cb(error,
      stdout_length ? String(Buffer.concat(stdout, stdout_length)) : '',
      stderr_length ? String(Buffer.concat(stderr, stderr_length)) : ''
    );
  }

  queue.push(cmd, onFinish);

  // Cleanup for GC (Garbage Collector).
  cmd = null;
};