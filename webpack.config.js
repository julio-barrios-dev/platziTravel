const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const stylesHandler = 'style-loader'
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: './public/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: './',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: "./public/css", to: "./css" },
        { from: "./public/img", to: "./img" },
        { from: "./public/svg", to: "./svg" },
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'public'),
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    open: true,
  },
}
