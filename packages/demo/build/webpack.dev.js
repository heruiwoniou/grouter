const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PathToRouterWebpackPlugin = require("path-to-router-webpack-plugin");
const merge = require("webpack-merge");
const path = require("path");

const resolve = relativePath => path.resolve(__dirname, "../", relativePath);
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
    new PathToRouterWebpackPlugin({
      watchDir: resolve("src/pages"),
      template: resolve("src/AutoRouter.tpl"),
      output: resolve("src/AutoRouter.js")
    }),
    new HtmlWebpackPlugin({
      template: resolve("public/index.html")
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
