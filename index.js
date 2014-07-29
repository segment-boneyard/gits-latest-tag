
var thunkify = require('thunkify');
var assert = require('assert');

/**
 * Expose `latestTag`
 */

module.exports = latestTag;

/**
 * Generate a function to get the latest tag.
 *
 * @param {GitHub} github
 * @return {Function}
 */

function latestTag (github) {
  assert(github, 'Must pass a github instance.');
  return function *(user, repo) {
    var repos = github.repos;
    var get = thunkify(repos.getTags.bind(repos));
    var content = yield get({
      user: user,
      repo: repo
    });
    return content[0].name;
  };
};
