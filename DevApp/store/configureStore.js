// Using Webpack Define Plugin to remove dev tools from the production build
if (__DEV__) {
  module.exports = require('./configureStore.dev');
}
else if (__PRODUCTION__) {
  module.exports = require('./configureStore.prod');
}
