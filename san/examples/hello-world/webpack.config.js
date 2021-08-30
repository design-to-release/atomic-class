const SanLoaderPlugin = require('san-loader/lib/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const AtomicClassSanWebpack = require('@atomic-class/san/webpack');

const { join } = require('path');

module.exports = {
  entry: join(__dirname, './src/main.js'),
  output: {
    path: join(__dirname, './dist'),
  },
  devServer: {
    port: 8888,
  },
  module: {
    rules: [
      {
        test: /\.san$/,
        use: [
          { loader: 'san-loader', options: { esModule: true } },
          { loader: AtomicClassSanWebpack.loader, options: { dbg: true } },
        ],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({ template: './index.html' }),
    new SanLoaderPlugin({ esModule: true }),
    new AtomicClassSanWebpack.Plugin({ css: { paths: ['./global.css'] } }),
  ],
};
