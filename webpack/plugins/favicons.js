/**
 * Favicons plugin module.
 * @module webpack/plugins/favicons
 */

import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import projectConfig from 'project-config';

export default new FaviconsWebpackPlugin({
  logo: `./${projectConfig.paths.srcPublic}/logo.png`,
  prefix: 'assets/icons-[hash]/',
  emitStats: false,
  statsFilename: 'icon-stats-[hash].json',
  persistentCache: true,
  inject: true,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: true,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: false
  }
});
