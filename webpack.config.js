const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  FaviconsWebpackPlugin = require('favicons-webpack-plugin');

let NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    script: './src/js/script.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ],
          publicPath: "/dist"
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/',
          {
            loader: 'image-webpack-loader',
            query: {
              imageminPngquant: {
                quality: '65-90',
                speed: 4
              },
              imageminMozjpeg: {
                quality: 75,
                interlaced: false,
                progressive: true,
                svgo: {
                  plugins: [
                    {
                      removeViewBox: false
                    },
                    {
                      removeEmptyAttrs: false
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host: "192.168.0.112",
    port: 3000,
    stats: "errors-only"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        collapseWhitespace: NODE_ENV == 'production'
      },
      hash: NODE_ENV == 'development'
    }),
    new ExtractTextPlugin({
      filename: "main.css",
      disable: false,
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {from: 'src/libraries/', to: 'libraries'}
    ])
  ]
}
