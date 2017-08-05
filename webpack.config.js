var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var cssCode = new ExtractTextPlugin("./css/styles.css");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader?name=./fonts/[name].[ext]"
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=20000'
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(cssCode.extract([
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]))
      }
    ]
  },
  devServer: {
    inline: true,
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    hot: true
  },
  plugins: [
    cssCode,
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/assets/index.html'
    })
  ]
};