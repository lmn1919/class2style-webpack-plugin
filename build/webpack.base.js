const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const ClassToStyleWebpackPlugin = require('../class-to-style-webpack-plugin');
const HtmlGetclassWebpackPlugin = require('../html-get-class-webpack-plugin');
const rootDir = process.cwd();

module.exports = {
  entry: path.resolve(rootDir, 'src/index.js'),
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'bundle.[contenthash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: 'babel-loader',
        include: path.resolve(rootDir, 'src'),
        exclude: /node_modules/,
      },
      {
        // 匹配 html 文件
        test: /\.html$/,
        include: path.resolve(rootDir, 'src'),
        /*
        使用 html-loader, 将 html 内容存为 js 字符串，比如当遇到
        import htmlString from './template.html';
        template.html 的文件内容会被转成一个 js 字符串，合并到 js 文件里。
        */
        use: 'html-loader'
      },
    ]
  },
  plugins: [

    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, 'public/test.ejs'),
      inject: 'body',
      scriptLoading: 'blocking',
    }),
    new CleanWebpackPlugin(),
    new HtmlGetclassWebpackPlugin()
    // new ClassToStyleWebpackPlugin({outFileName:"buildInfo"})
  ],
}