const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve("lib"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      },
    ],
  },
  plugins: [
    ...(process.env.NODE_ENV === 'production' ? [new MiniCssExtractPlugin()] : [])
  ],
  externals: {
    react: "react", // Use the external React version at runtime
  },
};
