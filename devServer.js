var express         = require('express');
var webpack         = require('webpack');
var webpackConfig   = require('./webpack.config.dev');

// Create Server
var app = express();

var compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

// Start application
// Optional port override with environment variable DEV_SERVER_PORT
var portNumber = process.env.DEV_SERVER_PORT || 8080;
app.listen(portNumber, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
});
