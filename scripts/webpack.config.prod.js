const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const { EnvironmentPlugin } = webpack
const { UglifyJsPlugin } = webpack.optimize

module.exports = {
  entry: path.join(__dirname, '..', 'src', 'client.js'),
  output: {
    filename: path.join('static', '[name].[hash].js'),
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/'
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
    new EnvironmentPlugin({ NODE_ENV: 'production' }),
    new UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: { screw_ie8: true, keep_fnames: true },
      compress: { screw_ie8: true },
      comments: false
    }),
    new ManifestPlugin({ fileName: 'stats.json' })
  ]
}
