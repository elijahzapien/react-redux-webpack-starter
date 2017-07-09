/**
 * Styles rule module.
 * @module webpack/rules/styles
 */

import projectConfig from 'project-config';

export default function(plugin) {
  return {
    test: /\.(sass|scss)$/,
    loader: plugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: projectConfig.sourcemaps,
            minimize: {
              autoprefixer: {
                add: true,
                remove: true,
                browsers: ['last 2 versions'],
              },
              discardComments: {
                removeAll: true,
              },
              discardUnused: false,
              mergeIdents: false,
              reduceIdents: false,
              safe: true,
              sourcemap: projectConfig.sourcemaps,
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: projectConfig.sourcemaps,
            includePaths: [
              projectConfig.paths.srcStyles,
            ],
          },
        }
      ],
    })
  };
}
