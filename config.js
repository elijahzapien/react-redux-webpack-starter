/**
 * config module.
 * @module /config
 */

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  env: NODE_ENV,
  files: {
    client: 'client'
  },
  directories: {
    src: 'src',
    dist: 'dist',
    server: 'server',
    client: 'client',
    public: 'public',
    html: 'html',
    styles: 'sass',
    javascript: 'javascript'
  },
  paths: {
    base: __dirname,
    public: '/',
    get src() {
      return `${config.directories.src}`;
    },
    get srcClient() {
      return `${config.paths.src}/${config.directories.client}`;
    },
    get srcPublic() {
      return `${config.paths.srcClient}/${config.directories.public}`;
    },
    get srcHtml() {
      return `${config.paths.srcClient}/${config.directories.html}`;
    },
    get srcStyles() {
      return `${config.paths.srcClient}/${config.directories.styles}`;
    },
    get srcJavascript() {
      return `${config.paths.srcClient}/${config.directories.javascript}`;
    },
    get dist() {
      return `/${config.directories.dist}`;
    }
  },
  sourcemaps: true,
  externals: {},
  globals: {},
  verbose: false,
  vendors: []
};

export default config;
