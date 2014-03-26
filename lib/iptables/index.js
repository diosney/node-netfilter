// Append  one  or  more  rules  to  the  end of the selected chain.
//exports.append = require('./append');

// Set the policy for the chain to the given target.
exports.policy = require('./policy');


// Create a new user-defined chain by the given name.
exports.new = require('./new');

// Rename the user specified chain to the user supplied name.
exports.rename = require('./rename');

// General utility functions and constants.
exports.utils = require('./utils');