import webpack                from 'webpack'
import path                   from 'path'
import {paths}                from './config.js'

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  cache    : true,
  output   : {
    filename : '[name].bundle.js',
  },
  // optimization: {
  //   splitChunks: {
  //     name   : 'vendor',
  //     chunks (chunk) {
  //       return chunk.name !== 'base-theme';
  //     },
  //   }
  // },
  // externals: {
  //   swiper: 'Swiper',
  // },
  plugins  : [
  // new BundleAnalyzerPlugin(),
  ],
  target: ['web', 'es5'],
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
      use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
      ]
    }
    ]
  },
  resolve: {
    modules    : ["node_modules"],
    extensions: ['.js'],
    alias: {
      '@as': paths.assetsDir,
      '@js': paths.jsSrcDir
    }
  }
};