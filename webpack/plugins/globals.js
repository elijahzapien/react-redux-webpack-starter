/**
 * Globals plugin module.
 * @module webpack-plugins/globals
 */

import webpack from 'webpack';

import projectConfig from 'project-config';

const __DEV__ = process.env.NODE_ENV === 'development';
const __TEST__ = process.env.NODE_ENV === 'test';
const __PROD__ = process.env.NODE_ENV === 'production';

export default new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  },
  __DEV__,
  __TEST__,
  __PROD__,
  ...projectConfig.globals
});
