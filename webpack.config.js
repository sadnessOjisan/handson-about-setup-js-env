const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "build.js"
  },
  module: {
    rules: [{ test: /\.(js|jsx)$/, use: "babel-loader" }]
  },
  resolve: {
    extensions: [".js"]
  }
};
