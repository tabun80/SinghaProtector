const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const path = require('path');

const baseConfig = require('./webpack.config');

module.exports = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    new ExtensionReloader({
      manifest: path.resolve(__dirname, '../public/manifest.json'),
      port: 3001,
      reloadPage: true,
      entries: {
        contentScript: 'contentscript',
      },
    }),
  ],
};
