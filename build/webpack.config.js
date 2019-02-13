const { join, resolve } = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '../dist', //必须加publicPath
  },
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        // 过滤node_modules
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({  // Also generate a test.html
      template: 'index.html'
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    host: 'localhost', //可选，ip
    port: 3000, //可选，端口,
    hot: true,
    inline: true,
    contentBase: resolve(__dirname,'dist'), //可选，基本目录结构
    compress: true //可选，压缩
  }
}