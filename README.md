# gits-latest-tag

A lib to get the latest tag of a repo on [Github](https://github.com/).

## Installation

`npm install gits-latest-tag`

## Example

```js
var co = require('co');
var GitHub = require('github');
var github = new GitHub({ version: '3.0.0' });
var latestTag = require('s-github-latest-tag')(github);

co(function *() {
  var tag = yield latestTag('travisjeffery', 'timecop');
  console.log(tag); // v0.7.1
})();
```

## License

MIT
