/**
 * Styles plugin module.
 * @module webpack-plugins/styles
 */

import ExtractTextPlugin from 'extract-text-webpack-plugin';

const __DEV__ = process.env.NODE_ENV === 'development';

export default new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash].css',
  allChunks: true,
  disable: __DEV__,
});
