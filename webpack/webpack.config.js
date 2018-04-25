/**
 * webpackConfig module.
 * @module webpack-config
 *
 * Rather than manage one giant configuration file, externals, rules
 * and plugins have been broken out into their own files in ./externals,
 * ./rules and ./plugins.
 *
 * To add a new item, for example a plugin:
 * - create a new module in ./plugins
 * - add it to the export list in ./plugins/index.js
 * - reference it here via plugin.PLUGIN_NAME
 */

import { arrayInsertIf } from 'webpack-utils/spread';

import projectConfig from 'project-config';

// import * as externals from 'webpack-externals';
import * as rules from 'webpack-rules';
import * as plugins from 'webpack-plugins';

const __DEV__ = process.env.NODE_ENV === 'development';
const __PROD__ = process.env.NODE_ENV === 'production';

export default {
  entry: {
    client: [
      `./${projectConfig.paths.srcJavascript}/client.js`,
      ...arrayInsertIf(
        __DEV__,
        `webpack-hot-middleware/client.js?path=${projectConfig.paths.public}__webpack_hmr`
      ),
    ]
  },
  devtool: projectConfig.sourcemaps ? 'source-map' : false,
  output: {
    path: `${projectConfig.paths.base}/${projectConfig.paths.dist}`,
    pathinfo: __DEV__,
    filename: __DEV__ ? 'javascript/[name].js' : 'javascript/[name].[chunkhash].js',
    publicPath: projectConfig.paths.public,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    modules: [
      projectConfig.directories.src,
      'node_modules',
    ],
  },
  externals: [],
  module: {
    rules: [
      rules.jsRule,
      rules.stylesRule(plugins.stylesPlugin),
      rules.imagesRule
    ],
  },
  plugins: [
    plugins.globalsPlugin,
    ...arrayInsertIf(
      __DEV__,
      plugins.namedModulesPlugin,
      plugins.hotModuleReplacementPlugin,
    ),
    ...arrayInsertIf(
      __PROD__,
      plugins.loaderOptionsPlugin,
      plugins.uglifyJavascriptPlugin,
      plugins.faviconsPlugin
    ),
    plugins.stylesPlugin,
    plugins.htmlPlugin,
  ],
};
