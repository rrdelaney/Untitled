const path = require('path')
const webpack = require('webpack')
const BeatifulWebpackPlugin = require('./beautiful-webpack')

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '..', 'src', 'client.js')
  ],
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, '..', 'src')],
        loader: 'babel-loader',
        options: {
          presets: [
            'react',
            [
              'env',
              {
                modules: false
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BeatifulWebpackPlugin('Things', 'http://localhost:3000')
  ]
}
