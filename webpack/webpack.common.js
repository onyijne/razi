const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const WebpackNoModulePlugin = require('webpack-nomodule-plugin')
  .WebpackNoModulePlugin

const pages = fs
  .readdirSync(path.resolve(__dirname, '../public'))
  .filter(fileName => fileName.endsWith('.html'))

const config = {
  entry: {
    main: path.resolve(__dirname, '../src/entries') + '/index.js',
    user: path.resolve(__dirname, '../src/entries') + '/user.js',
    login: path.resolve(__dirname, '../src/entries') + '/login.js',
    signup: path.resolve(__dirname, '../src/entries') + '/signup.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../src'),
      Razi: path.resolve(__dirname, '../src/libs/@razi/core/index.js')
    }
  },
  plugins: [
    ...pages.map(page => new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      title: 'Razi Props',
      appMountId: 'app',
      template: `./public/${page}`,
      filename: page,
      outputPath: path.resolve(__dirname, '../dist')
    })),
    new HtmlWebpackHarddiskPlugin(),
    new WebpackNoModulePlugin({
      filePatterns: ['polyfill.**.js']
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: '' }]
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new LodashModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'file-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /\.module\.css$/
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        include: /\.module\.css$/
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}

module.exports = config
