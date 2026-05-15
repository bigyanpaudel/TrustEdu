const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      "assert": require.resolve("assert/"),
      "buffer": require.resolve("buffer/"),
      "constants": require.resolve("constants-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "path": require.resolve("path-browserify"),
      "process": require.resolve("process/browser"),
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"),
      "util": require.resolve("util/"),
      "fs": false,
      "net": false,
      "tls": false,
      "child_process": false,
      "cluster": false,
      "console": false,
      "dgram": false,
      "dns": false,
      "domain": false,
      "events": false,
      "http": false,
      "http2": false,
      "inspector": false,
      "module": false,
      "perf_hooks": false,
      "punycode": false,
      "querystring": false,
      "readline": false,
      "repl": false,
      "string_decoder": false,
      "sys": false,
      "timers": false,
      "tty": false,
      "v8": false,
      "vm": false,
      "worker_threads": false,
      "zlib": false
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
  new HtmlWebpackPlugin({
    template: "./public/index.html"
  }),
  new webpack.ProvidePlugin({
    Buffer: ['buffer', 'Buffer'],
    process: 'process/browser'
  })
],
  devServer: {
    port: 8080,
    hot: true
  }
};