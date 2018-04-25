/**
 * Javascript rule module.
 * @module webpack-rules/javascript
 */

export default {
  test: /\.(js|es6|jsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true
      }
    },
    'eslint-loader'
  ]
};
