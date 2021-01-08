import path from 'path'
import webpack, { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
// @ts-ignore
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin'
import createStyledComponentsTransformer from 'typescript-plugin-styled-components'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'

const styledComponentsTransformer = createStyledComponentsTransformer()

const isDevelopment = process.env.NODE_ENV !== 'production'

const webpackConfig = (env: any): Configuration => ({
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'build.js',
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, 'src'),
        loader: isDevelopment ? 'babel-loader' : 'ts-loader',
        options: isDevelopment
          ? {
              presets: ['@babel/preset-react', '@babel/preset-typescript'],
              plugins: ['react-refresh/babel', 'babel-plugin-styled-components'],
            }
          : {
              transpileOnly: true,
              getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
            },
        exclude: /dist/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        // ?name=[name].[ext] is only necessary to preserve the original file name
        use: ['file-loader?name=[name].[ext]'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    isDevelopment && new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        // same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: isDevelopment ? 'public/' : '',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html', '**/favicon.ico'],
          },
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),
})

export default webpackConfig
