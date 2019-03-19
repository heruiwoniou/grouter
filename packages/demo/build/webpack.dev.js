const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HelloWebpackPlugin = require("he")
const merge = require("webpack-merge");
const { resolve } = require("path");

const base = require("./webpack.base");

module.exports = merge(base, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    host: "0.0.0.0",
    hot: true,
		port: 5001,
		historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "../public/index.html")
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
