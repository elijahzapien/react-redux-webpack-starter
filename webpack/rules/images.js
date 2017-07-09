/**
 * Images rule module.
 * @module webpack-rules/images
 */

export default {
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192
      }
    }
  ]
};
