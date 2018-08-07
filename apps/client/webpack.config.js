const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
    // Entry and output points
    entry: [
        'react-hot-loader/patch', // activate hot module reloading for react

        'webpack-dev-server/client?http://client.timer.test',

        'webpack/hot/only-dev-server',

        path.join(__dirname, 'src/index.ts')
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath is necessary for HMR
        publicPath: '/'
    },

    // Plugins and loaders
    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.ejs' }),
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader', options: { includePaths: ['./src/styles'] } }
                ]
            },
            {
                test: /\.svg$/,
                use: ['url-loader']
            },
            {
                test: /\.woff2?$/,
                use: ['url-loader']
            },
            {
                test: /\.eot$/,
                use: ['url-loader']
            },
            {
                test: /\.ttf$/,
                use: ['url-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            }
        ]
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        modules: [path.join(__dirname, "src"), "node_modules"]
    },

    // Dev configurations
    devtool: 'cheap-eval-source-map',
    devServer: {
        hot: true,
        historyApiFallback: true,
        host: "0.0.0.0",
        port: 7000,
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/',
        disableHostCheck: true // Believe this is required for usage behind a proxy, see https://github.com/webpack/webpack-dev-server/releases/tag/v2.4.3
    }
};
