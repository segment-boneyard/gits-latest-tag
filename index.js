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
 *   @param {String} user
 *   @param {String} repo
 *   @return {Promise}
 */

function latestTag(github) {
  assert(github, 'Must pass a github instance.');

  return function(user, repo) {
    return new Promise(function(resolve, reject){
      github.repos.getTags({user: user, repo: repo}, function(err, tags){
        if (err) return reject(err);

        var tag = tags
          .filter(function(tag){
            return semver.valid(tag.name);
          })
          .sort(function(a, b){
            return semver.compare(a.name, b.name);
          })
          .pop()
          .name;

        resolve(tag);
      })
    });
  };
};
