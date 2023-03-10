const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/client/index.tsx"),
  output: {
    path: path.resolve(__dirname, "extension/chrome/build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  mode: "development",
  module: {
    rules: [
      {
        // Testing for any .js/.jsx files to be transpiled by Babel preset-react, and to transpile down
        // any ES6+ code down to version that can be compatible with any browser
        test: /\.(js|jsx)$/i,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", `@babel/preset-react`],
          },
        },
      },
      {
        // Testing for any .css/.scss files so that webpack can fulfill the style import in 'index.js'
        test: /\.(scss)$/i,
        exclude: /(node_modules)/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: ["ts-loader"],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            loader: "url-loader",
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Generates an HTML file based on the template we pass in to serve our webpack files
    // which in this case, the template is our own 'index.html' file
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./src/client/index.html"),
    }),
  ],
  resolve: {
    // Enable importing .js and .jsx files without specifying their extension
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};
