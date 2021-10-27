const SanLoaderPlugin = require('san-loader/lib/plugin');
const AtomicClassSanWebpack = require('@atomic-class/san/webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tailwindcss = require('tailwindcss');
const { join } = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'production',
  entry: join(__dirname, './src/mod.js'),
  output: {
    path: join(__dirname, './dist'),
    libraryTarget: 'module',
    filename: 'mod.js',
  },
  devtool: 'source-map',
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.san$/,
        use: [
          { loader: 'san-loader', options: { esModule: true } },
          { loader: AtomicClassSanWebpack.loader, options: { dbg: false } },
        ],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.(post)?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [tailwindcss],
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
  plugins: [
    new SanLoaderPlugin({ esModule: true }),
    new MiniCssExtractPlugin({
      filename: 'mod.css',
    }),
  ],
};
