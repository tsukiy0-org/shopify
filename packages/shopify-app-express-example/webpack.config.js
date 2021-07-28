const path = require("path");
const PathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src/index.ts"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "commonjs",
  },
  target: "node",
  mode: "production",
  optimization: {
    minimize: false,
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".ts"],
    plugins: [new PathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "ts",
          target: "es2015",
        },
      },
    ],
  },
};
