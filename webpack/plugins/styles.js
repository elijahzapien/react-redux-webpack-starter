/**
 * Styles plugin module.
 * @module webpack-plugins/styles
 */

import ExtractTextPlugin from 'extract-text-webpack-plugin';

import projectConfig from 'project-config';

const __DEV__ = projectConfig.env === 'development';

export default new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash].css',
  allChunks: true,
  disable: __DEV__,
});
