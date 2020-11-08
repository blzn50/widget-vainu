const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const bundleOutputDir = './dist';

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);
  return [
    {
      entry: ['babel-polyfill', './src/index.js'],
      output: {
        filename: 'widget.js',
        path: path.resolve(bundleOutputDir),
      },
      devServer: {
        contentBase: bundleOutputDir,
        hot: true,
        disableHostCheck: true,
      },
      optimization: {
        minimize: true,
      },
      plugins: isDevBuild
        ? [
            new webpack.SourceMapDevToolPlugin(),
            new CopyWebpackPlugin({
              patterns: [{ from: 'public/' }],
            }),
            new MinifyPlugin(),
          ]
        : [new webpack.optimize.UglifyJsPlugin(), new MinifyPlugin()],
      module: {
        rules: [
          {
            test: /\.js$/i,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/env',
                    {
                      targets: {
                        browsers: ['ie 6', 'safari 7'],
                      },
                    },
                  ],
                ],
              },
            },
          },
          { test: /\.html$/i, use: 'html-loader' },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader' + (isDevBuild ? '' : '?minimize')],
          },
        ],
      },
    },
  ];
};
