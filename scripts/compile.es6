import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';

import * as logger from './utils/logger';

import projectConfig from 'project-config';
import webpackConfig from 'webpack-config';

const runWebpackCompiler = (webpackConfig) => {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        logger.error('Webpack compiler encountered a fatal error.', err);
        return reject(err);
      }

      const jsonStats = stats.toJson();
      if (jsonStats.errors.length > 0) {
        logger.error('Webpack compiler encountered errors.');
        logger.log(jsonStats.errors.join('\n'));
        return reject(new Error('Webpack compiler encountered errors'));
      } else if (jsonStats.warnings.length > 0) {
        logger.warn('Webpack compiler encountered warnings.');
        logger.log(jsonStats.warnings.join('\n'));
      }
      resolve(stats);
    });
  });
};

const compile = () => {
  return Promise.resolve()
    .then(() => logger.info('Starting compiler...'))
    .then(() => logger.info(
      'Target application environment: ' + chalk.bold(projectConfig.env)
    ))
    .then(() => runWebpackCompiler(webpackConfig))
    .then((stats) => {
      if (projectConfig.verbose) {
        logger.log(stats.toString({
          colors: true,
          chunks: false,
        }));
      }

      logger.success(
        `Compiler finished successfully! See ./${projectConfig.paths.dist}.`
      );
    })
    .catch((err) => logger.error('Compiler encountered errors.', err));
};

compile();
