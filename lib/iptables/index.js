// Set the policy for the chain to the given target.
exports.policy = require('./policy');

// Create a new user-defined chain by the given name.
exports.new = require('./new');

// Rename the user specified chain to the user supplied name.
exports.rename = require('./rename');

// Delete  the  optional user-defined chain specified.
exports.deleteChain = require('./delete_chain');

// Zero the packet and byte counters.
exports.zero = require('./zero');

// Flush the selected chain (all the chains in the table if none is given).
exports.flush = require('./flush');

// Append  one  or  more  rules  to  the  end of the selected chain.
exports.append = require('./append');

// Delete one or more rules from the selected chain.
exports.delete = require('./delete');

// Insert one or more rules in the selected chain as the given rule number.
exports.insert = require('./insert');

// General utility functions and constants.
exports.utils = require('./utils');