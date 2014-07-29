var assert = require('assert');
var co = require('co');
var config = require('./config');
var GitHub = require('github');
var github = new GitHub({ version: '3.0.0' });

describe('latestTag', function () {
  var latestTag;

  before(function() {
    github.authenticate({ type: 'oauth', token: config.token });
    latestTag = require('..')(github);
  });

  it('should get the latest tag', co(function *() {
    var tag = yield latestTag('travisjeffery', 'timecop');
    assert(tag.indexOf('v') == 0);
  }));
});
