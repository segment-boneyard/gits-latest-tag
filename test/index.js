var assert = require('assert');
var co = require('co');
var GitHub = require('github');
var netrc = require('netrc')();
var semver = require('semver');

describe('latestTag', function () {
  var github = new GitHub({ version: '3.0.0' });
  github.authenticate({
    type: 'oauth',
    token: netrc['api.github.com'].password
  });

  var latestTag = require('..')(github);

  it('should get the latest tag', function *() {
    var tag = yield latestTag('travisjeffery', 'timecop');
    assert(tag.indexOf('v') == 0);
  });

  it('should only allow semver tags when configured', function *() {
    var tag = yield latestTag('segmentio', 'app');
    assert(semver.valid(tag));
  });
});
