/**
 * Loader Options plugin module.
 * @module webpack-plugins/loader-options
 */

import webpack from 'webpack';

export default new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false,
});
