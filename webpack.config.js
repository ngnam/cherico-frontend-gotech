const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const Dotenv = require('dotenv-webpack')

const projectPath = path.resolve(__dirname, './')
const plugins = []
const postcssPlugins = []
const dir = {
  project: projectPath,
  src: path.join(projectPath, 'src'),
  css: path.join(projectPath, 'src/css'),
  assets: path.join(projectPath, 'assets'),
  config: path.join(projectPath, 'config'),
  build: path.join(projectPath, 'build'),
  dist: path.join(projectPath, 'dist'),
  mocks: path.join(projectPath, 'src/__mocks__'),
}

module.exports = (env = {}, argv) => {
  const isProd = argv.mode === 'production'
  const outputPath = isProd ? dir.dist : dir.build

  if (isProd) {
    plugins.push(
      new webpack.EnvironmentPlugin([
        'NODE_ENV',
        'API_BASE_URL',
        'DEV_ENV',
        'IMAGE_HOST',
        'REGION',
        'USER_POOL_ID',
        'USER_POOL_WEB_CLIENT_ID',
      ])
    )
  } else {
    plugins.push(
      new Dotenv({
        safe: true,
      })
    )
  }

  plugins.push(
    new HtmlWebpackPlugin({
      title: 'mirateo',
      template:
        process.env.NODE_ENV === 'production'
          ? `${dir.mocks}/index_production.ejs`
          : `${dir.mocks}/index.ejs`,
      filename: 'index.html',
      chunks: ['app'],
    })
  )

  // Copy extra assets into build directory
  plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${dir.assets}/`,
          to: `${isProd ? dir.dist : dir.build}/assets`,
        },
      ],
    })
  )

  if (!isProd) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name]-[hash].css',
        chunkFilename: '[id].css',
      })
    )
  }

  // browser list doc -> https://github.com/ai/browserslist#queries
  postcssPlugins.push(autoprefixer())

  const entry = {
    app: [`${dir.src}/App`],
  }

  if (!isProd) {
    for (const [, e] of Object.entries(entry)) {
      e.unshift('react-hot-loader/patch')
    }
  }

  const cssExtractConfig = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '/',
    },
  }

  return {
    context: dir.project,
    entry,
    output: {
      filename: '[name]-[hash].js',
      path: outputPath,
      publicPath: '/',
    },
    externals: {
      jquery: 'jQuery',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: [isProd ? cssExtractConfig : 'style-loader', 'css-loader'],
        },
        {
          test: /\.sass|scss$/,
          use: [
            isProd ? cssExtractConfig : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'global',
                  localIdentName: '[folder]-[name]-[hash:base64:6]',
                },
                localsConvention: 'camelCase',
                url: false,
                sourceMap: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins: postcssPlugins,
              },
            },
            {
              loader: 'sass-loader',
              // options doc -> https://github.com/sass/node-sass
              options: {
                sassOptions: {
                  sourceMap: true,
                  includePaths: [dir.css],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {},
            },
          ],
        },
        {
          test: /\.(ya?ml)$/i,
          use: [
            {
              loader: 'json-loader',
            },
            {
              loader: 'yaml-loader',
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'react-svg-loader',
            },
          ],
        },
      ],
    },
    plugins: plugins,
    resolve: {
      extensions: ['.mjs', '.js'],
      modules: ['node_modules', dir.project, dir.src],
      alias: {
        joi: 'joi-browser',
        'react-dom': !isProd ? '@hot-loader/react-dom' : 'react-dom',
      },
    },
    devServer: {
      contentBase: dir.build,
      port: 8080,
      host: '0.0.0.0',
      disableHostCheck: true,
      hot: true,
      historyApiFallback: true,
      inline: true,
      // https: true,
      open: true,
    },
  }
}
