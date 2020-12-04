const webpack = require('webpack');
const ejs = require('ejs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
// VueLoaderPlugin to solve the compatibility with webpack5
const { VueLoaderPlugin } = require('vue-loader');
const { version } = require('./package.json');

const config = {
  mode: process.env.NODE_ENV,
  context: __dirname + "/src",
  entry: {
    background: "./background.js",
    content: "./content.js",
    "popup/popup": "./popup/popup.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".vue"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loaders: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader?indentedSyntax"
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?emitFile=false"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      global: "window"
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CopyWebpackPlugin([
      { from: "icons", to: "icons", ignore: ["icon.xcf"] },
      {
        from: "popup/popup.html",
        to: "popup/popup.html",
        transform: transformHtml
      },
      {
        from: "manifest.json",
        to: "manifest.json",
        transform: content => {
          const jsonContent = JSON.parse(content);
          jsonContent.version = version;

          return JSON.stringify(jsonContent, null, 2);
        }
      }
    ])
  ]
};

if (config.mode === 'production') {
  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ]);
}

function transformHtml(content) {
  return ejs.render(content.toString(), {
    ...process.env,
  });
}

module.exports = config;
