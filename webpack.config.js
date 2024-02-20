/*
This is the webpack configuration file for the Chrome extension's background script
*/

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // Designate entrypoint
  entry: path.resolve(__dirname, "src/background/index.ts"),

  // Designate output
  output: {
    path: path.resolve(__dirname, "extension/chrome/build"),
    filename: "background.js",
    publicPath: "/",
  },

  // Configure source maps for development environment
  devtool: "inline-source-map",

  // Optimize build for development environment
  mode: "development",

  // Configure rules for module use
  module: {
    rules: [
      // For JavaScript
      {
        test: /\.(js|jsx)$/i,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },

      // For TypeScript
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: ["ts-loader"],
      },

      // For CSS
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },

      // For Sass
      {
        test: /\.(scss)$/i,
        exclude: /(node_modules)/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      // For images, fonts, and other file types smaller than 8192 bytes
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },

  // Configure plugins
  plugins: [

    // For generating an HTML file from a template
    new HtmlWebpackPlugin({
      filename: "background.html",
      template: path.resolve(__dirname, "./src/background/index.html"),
    }),

    // For using webpack-bundle-analyzer
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      generateStatsFile: false,
    }),
  ],

  // Scope output file extensions
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};