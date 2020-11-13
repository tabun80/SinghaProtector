const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, '..', 'src', 'settings', 'index.tsx'),
    contentscript: path.join(__dirname, '..', 'src', 'contentscript', 'index.ts'),
    background: path.join(__dirname, '..', 'src', 'background', 'index.ts'),
    stop: path.join(__dirname, '..', 'src', 'stop.ts'),
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
  },
  module: {
    rules: [
      {
        test: [/\.tsx?$/, /\.js$/],
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      },
      {
        test: [/\.tsx?$/, /\.js$/],
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: true},
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
      chunks: ['app'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/manifest.json', to: 'manifest.json' },
        { from: 'public/logo.png', to: 'logo.png' },
      ],
    }),
  ],
};
