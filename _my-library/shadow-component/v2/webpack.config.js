const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  // devServer: {
  //   contentBase: './dist',
  //   hot: true,
  // },
  devtool: 'inline-source-map',
  target: ['es5', 'web'],
  entry: './src/index.js',
  output: {
    library: 'UserList',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].bundle.js',
    clean: true,
  },
  plugins: [
    // 로더로 처리된 자바스크립트 결과물을 난독화 처리
    new uglifyJsPlugin(),
    //  webpack 번들을 제공하는 HTML 파일 생성을 단순화
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    // 핫리로드를 구현함
    new webpack.HotModuleReplacementPlugin(),
    // output.clean 옵션으로 대체
    // new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      // 바벨 로더 적용
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  ie: '10',
                },
                modules: false,
                useBuiltIns: 'entry',
              },
            ],
          ],
        },
        exclude: ['/node_modules'],
      },
      // scss, sass loader 적용
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: ['/node_modules'],
      },
    ],
  },
};
