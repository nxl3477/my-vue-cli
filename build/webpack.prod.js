const webpack = require('webpack');
const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const argv = require('yargs').argv



module.exports = {
  output: {
    path: join(__dirname, '../dist'),
    filename: "js/[name]-[contenthash].js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    // 打包前清除缓存
    new CleanWebpackPlugin(),
    // 抽离 css
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'css/[name]-[contenthash].css',
      chunkFilename: 'css/[name]-[id]-[contenthash].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    // gzip
    // new CompressionWebpackPlugin(),
    // 生成html
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: join(__dirname, '../public/index.html')
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      // 压缩css
      new OptimizeCssAssetsPlugin()
    ],
    // 抽离运行时
    runtimeChunk: {
      name: entrypoint => `runtimechunk-${entrypoint.name}`
    },
    // code split
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      // 会被 chunk具体配置中的name 覆盖， 如果chunk中没有设置， 并且此处 name = true ， 会以key 替代 【name】变量占位符
      name: true,
      cacheGroups: {
        // 注意: priority属性
        // 其次: 打包业务中公共代码
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0
        },
        // 首先: 打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        },
        async: {
          chunks: "async",
          minSize: 1
        }
      }
    }
  },
  // 性能相关
  performance: {
    // 提示
    hints: "warning", // 枚举
    // 资源大小提示
    maxAssetSize: 20000000, // 整数类型（以字节为单位）
    // 入口文件大小
    maxEntrypointSize: 40000000, // 整数类型（以字节为单位）
    // 匹配文件类型
    assetFilter: function(assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  }
}