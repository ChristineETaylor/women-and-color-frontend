import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import cssvariables from 'postcss-css-variables';
import globalCssVars from './app/sharedStyles/cssVariables.js'
import autoprefixer from 'autoprefixer';

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body',
});

const PATHS = {
  app: path.join(__dirname, 'app/', 'entry/', 'index.js'),
  navigation: path.join(__dirname, 'app/', 'entry/', 'navigation.js'),
  footer: path.join(__dirname, 'app/', 'entry/', 'footer.js'),
  build: path.join(__dirname, 'dist'),
};

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;

const isProduction = LAUNCH_COMMAND === 'production';
process.env.BABEL_ENV = LAUNCH_COMMAND;

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});

const baseEntry = {
  app: PATHS.app,
  navigation: PATHS.navigation,
  footer: PATHS.footer,
};

const developEntry = {};
Object.keys(baseEntry).forEach(function(key) {
  var entryPoint = baseEntry[key];
  developEntry[key] = [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    entryPoint,
  ];
});

const base = {
  entry: baseEntry,
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                cssvariables({
                  preserve: true,
                  variables: globalCssVars
                }),
                autoprefixer({
                  browsers: ['last 2 versions', 'IE 11'],
                })
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./app'), path.resolve('./node_modules')],
    alias: {
      appCommon: path.resolve(__dirname, 'app/common/'),
      appPages: path.resolve(__dirname, 'app/pages/'),
      appConfig: path.resolve(__dirname, 'app/config/'),
      appRedux: path.resolve(__dirname, 'app/redux/'),
      appHelpers: path.resolve(__dirname, 'app/helpers/'),
      appAssets: path.resolve(__dirname, 'app/assets/'),
      appSharedStyles: path.resolve(__dirname, 'app/sharedStyles/'),
    },
  },
};

const developmentConfig = {
  entry: developEntry,
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: 'http://localhost:8080/',
  },
  plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()],
};

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HtmlWebpackPluginConfig, productionPlugin],
};

export default Object.assign(
  {},
  base,
  isProduction === true ? productionConfig : developmentConfig
);
