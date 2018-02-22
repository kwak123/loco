const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const SRC = path.join(__dirname, '/client');
const DIST = path.join(__dirname, '/server/dist');

module.exports = {
  entry: `${SRC}/App.jsx`,
  output: {
    path: DIST,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: SRC,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('main.css')
  ],
  devServer: {
    historyApiFallback: true
  }
};
