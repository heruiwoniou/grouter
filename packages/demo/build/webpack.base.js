const path = require("path");
const resolve = relativePath => path.resolve(__dirname, "../", relativePath);

module.exports = {
  entry: {
    bundle: resolve("src/index.js")
  },
  output: {
    path: resolve("dist"),
    filename: "[name].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1024,
            name: "fonts/[name].[ext]"
          }
        }
      },
      {
        test: /\.(gif|png|jpg|jpeg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1024,
            name: "images/[name].[ext]"
          }
        }
      }
    ]
  }
};
