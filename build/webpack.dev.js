const webpack = require('webpack');
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()

  ],
  devServer: {
    contentBase: require('path').join(__dirname, "../dist"),
    compress: true,
    port: 3002,
    hot: true,
    hotOnly:true,
    host: "0.0.0.0",
    // disableHostCheck: true, 
    overlay: true, // 编译出现错误时，将错误直接显示在页面上
  }
}