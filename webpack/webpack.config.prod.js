const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-only',
  bail: true,
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new FaviconsWebpackPlugin({
      logo: './public/logo.jpg', // svg works too!
      mode: 'webapp', // optional can be 'webapp' or 'light' - 'webapp' by default
      devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default
      cache: true,
      favicons: {
        appName: 'Razi',
        appDescription: 'A lightweight JavaScript framework',
        developerName: 'Samuel Onyijne',
        developerURL: null, // prevent retrieving from the nearest package.json
        background: '#ddd',
        theme_color: '#333',
        icons: {
          coast: false,
          firefox: false,
          yandex: false
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].chunk.css'
    })
  ]
})
