/**
 * Globals plugin module.
 * @module webpack/plugins/globals
 */

import webpack from 'webpack';

import projectConfig from 'project-config';

const __DEV__ = projectConfig.env === 'development';
const __TEST__ = projectConfig.env === 'test';
const __PROD__ = projectConfig.env === 'production';

export default new webpack.DefinePlugin(
  Object.assign(
    {
      'process.env': { NODE_ENV: JSON.stringify(projectConfig.env) },
      __DEV__,
      __TEST__,
      __PROD__,
    },
    projectConfig.globals
  )
);
