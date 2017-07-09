import path from 'path';

import express from 'express';
import compress from 'compression';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from 'webpack-config';
import projectConfig from 'project-config';

const __DEV__ = projectConfig.env === 'development';
const app = express();

app.use(compress());

if (__DEV__) {
  const compiler = webpack(webpackConfig);

  const devOptions = {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(
      projectConfig.paths.base,
      projectConfig.directories.src
    ),
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: 'normal',
  };

  const hotOptions = {
    path: '/__webpack_hmr',
  };

  const staticPath = path.resolve(projectConfig.paths.base, 'dist');

  app.use(webpackDevMiddleware(compiler, devOptions));
  app.use(webpackHotMiddleware(compiler, hotOptions));

  // Serve static assets from ~/public
  app.use(express.static(staticPath));

  // Rewrites all routes requests to the root /index.html file
  app.use('*', function(req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html');

    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }

      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
} else {
  /*
   * Serving ~/dist by default.
   * Ideally these files should be served by the web server and not
   * the app server, but this helps to demo the server in production.
   */
  app.use(express.static(
    path.resolve(projectConfig.paths.base, projectConfig.directories.dist)
  ));
}

const port = process.env.PORT || 3000;

app.listen(port, (error) => {
  if (error) {
    console.error(error.stack || error);
    throw error;
  }

  console.info('Webpack development server listening on port %s', port);
});
