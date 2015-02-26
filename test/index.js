var assert = require('assert');
var semver = require('semver');

/**
 * Stubbed github.
 */

var github = {
  repos: {
    getTags: function(obj, cb){
      cb(null, [{ name: 'v1.0.0' }, { name: 'non-semver' }]);
    }
  }
};

describe('latestTag', function () {
  var latestTag = require('..')(github);

  it('should get the latest tag', function *() {
    var tag = yield latestTag('travisjeffery', 'blah');
    assert(tag.indexOf('v1.0.0') == 0);
  });

  it('should only allow semver tags when configured', function *() {
    var tag = yield latestTag('travisjeffery', 'blah');
    assert(semver.valid(tag));
  });
});
