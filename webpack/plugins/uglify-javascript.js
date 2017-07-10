/**
 * Uglify Javascript plugin module.
 * @module webpack-plugins/uglify-javascript
 */

import webpack from 'webpack';

import projectConfig from 'project-config';

export default new webpack.optimize.UglifyJsPlugin({
  sourceMap: !!(projectConfig.sourcemaps ? 'source-map' : false),
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
  }
});
