//const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { node } = require("webpack");
require('dotenv').config()

function mode() {
  if (process.env.MODE === 'dev') {
    return 'development'
  }
  return 'production'
}

module.exports = {
  mode: mode(),
  entry: "./client/src/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/public/index.html",
      favicon: "./client/public/favicon.png"
    }),
    //new WebpackBundleAnalyzer(),
  ],
  resolve: {
    modules: [__dirname, "/client/src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ["file-loader"],
      }, 
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};