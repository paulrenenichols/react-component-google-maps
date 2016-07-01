var path              = require('path');
var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    devtool: 'inline-source-map',
    entry: [
        './DevApp/index.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.[hash].js',
        publicPath: './'
    },
    externals: {
      'google':     'google'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'DevApp'),
            exclude: /node_modules/
        },
        {
          test: /\.json$/,
          loader: 'json'
        },
        {
          test: /\.(less|css)$/,
          loaders: ['style', 'css', 'less'],
          include: path.join(__dirname, 'DevApp'),
          exclude: /node_modules/
        },
        {
          test: /\.(png)$/,
          loader: 'url?limit=100000&mimetype=image/png'
        },
        {
          test: /\.(jpg|gif|svg)$/,
          loader: 'file?name=images/[name].[ext]'
        }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'DevApp/index.ejs'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        __DEV__: false,
        __PRODUCTION__: true
      }),
      new webpack.optimize.OccurrenceOrderPlugin(true)
    ]
};
