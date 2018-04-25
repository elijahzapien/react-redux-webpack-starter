/**
 * Html plugin module.
 * @module webpack-plugins/html
 */

import HtmlWebpackPlugin from 'html-webpack-plugin';

import projectConfig from 'project-config';

const __DEV__ = process.env.NODE_ENV === 'development';

export default new HtmlWebpackPlugin({
  title: 'React, Redux, Webpack Starter',
  template: `${projectConfig.paths.srcHtml}/index.html`,
  inject: true,
  favicon: __DEV__ ? `${projectConfig.paths.srcPublic}/logo.png` : false,
  minify: {
    collapseWhitespace: true,
  },
});
