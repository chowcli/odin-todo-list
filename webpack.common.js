const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  entry: {
    app: "./src/index.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo List",
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
};
