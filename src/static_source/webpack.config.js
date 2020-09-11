const path = require('path')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'dev'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin')
const { root } = require('../../config')

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    index: path.join(root, '/src/static_source/index.js')
  },
  output: {
    filename: isDev ? '[name].bundle.js' : '[name].[hash:6].js',
    chunkFilename: isDev ? '[name].bundle.js' : '[name].[chunkhash:4].js',
    path: isDev ? path.join(root, '/src/static_source/dist') : path.join(root, '/src/static'),
    publicPath: '/'
  },
  node: { fs: 'empty' },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'post',
        include: path.join(root, '/src/static_source'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              'syntax-dynamic-import'
            ]
          }
        }
      },
      {
        test: /\.s*(c|a)ss$/,
        use: [
          isDev ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: !isDev
                ? '[folder]_[hash:base64:10]'
                : '[folder]_[local]_[hash:base64:5]',
              },
              localsConvention: 'dashes'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            }
          },
          'sass-loader',
        ]
      },
      {
        test: /\.(jpg|png|gif)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: isDev
              ? 'image/[name].[ext]'
              : 'image/[name].[hash:7].[ext]'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    !isDev && new CleanPlugin(),
    !isDev && new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    }),
    !isDev && new HtmlPlugin({
      title: 'Blog',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      templateContent: '<div id="root"></div>',
      inject: 'body',
      minify: true
    }),
    isDev && new webpack.NamedModulesPlugin(),
    isDev && new webpack.HotModuleReplacementPlugin(),
    isDev && new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ].filter(Boolean),
  devServer: {
    contentBase: path.join(root, '/src/static_source'),
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://helloworld-git-v2.life1st.vercel.app',
        secure: false,
        changeOrigin: true
      }
      // '/api': 'http://localhost:3000'
    }
  },
  devtool: 'source-map'
}
