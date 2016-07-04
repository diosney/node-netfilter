// Create a set identified with setname and specified type.
exports.create = require('./create');

// Add a given entry to the set.
exports.add = require('./add');

// Print program version.
exports.version = require('./version');

// Delete an entry from a set.
exports.del = require('./del');

// Test whether an entry is in a set or not.
exports.test = require('./test');

// Destroy the specified set or all the sets if none is given.
exports.destroy = require('./destroy');

// Flush all entries from the specified set or flush all sets if none is given.
exports.flush = require('./flush');

// Rename a set.
exports.rename = require('./rename');

// Swap the content of two sets.
exports.swap = require('./swap');