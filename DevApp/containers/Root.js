if (__DEV__) {
  module.exports = require('./Root.dev');
}
else if (__PRODUCTION__) {
  module.exports = require('./Root.prod');
}
