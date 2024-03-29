var path = require('path');

var outDirectory = 'dist';

module.exports = {
  entry: [
    './src/client'
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'src/shared'],
    extensions:        ['', '.js', '.jsx']
  },
  output: {
    path:     path.join(__dirname, outDirectory),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  },
};
