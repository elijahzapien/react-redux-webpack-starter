/**
 * webpackConfig module.
 * @module webpack/webpack.config
 *
 * Rather than manage one giant configuration file, rules and plugins have
 * been broken out into their own files in ./rules and ./plugins.
 *
 * To add a new rule or plugin:
 * - create a new file in ./rules or ./plugins
 * - add it to the export list in ./rules/index.js or ./plugins/index.js
 * - reference it here via rules.RULE_NAME or plugins.PLUGIN_NAME
 */

import webpack from 'webpack';

import projectConfig from 'project-config';

import * as rules from 'webpack-rules';
import * as plugins from 'webpack-plugins';

const __DEV__ = projectConfig.env === 'development';
const __PROD__ = projectConfig.env === 'production';

// Config
// --------------------
let config = {
  entry: {
    client: [
      `./${projectConfig.paths.srcJavascript}/client.js`
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
    modules: [
      projectConfig.directories.src,
      'node_modules',
    ],
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  externals: projectConfig.externals,
  module: {
    rules: [
      rules.jsRule,
      rules.stylesRule(plugins.stylesPlugin),
      rules.imagesRule
    ],
  },
  plugins: [
    plugins.globalsPlugin,
    plugins.stylesPlugin,
    plugins.htmlPlugin,
  ],
};


// Development Tools
// --------------------
if (__DEV__) {
  config.entry.client.push(
    `webpack-hot-middleware/client.js?path=${config.output.publicPath}__webpack_hmr`
  );

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
}


// Production Optimizations
// --------------------
if (__PROD__) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: !!config.devtool,
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
    }),
    plugins.faviconsPlugin
  );
}

export default config;
