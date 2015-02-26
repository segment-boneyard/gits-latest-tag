
var thunkify = require('thunkify');
var semver = require('semver');
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
    var all = yield get({ user: user, repo: repo });

    var valid = all
      .filter(function (tag) {
        return semver.valid(tag.name);
      })
      .sort(function (a, b) {
        return semver.compare(a.name, b.name);
      });

    return valid.pop().name;
  };
};
