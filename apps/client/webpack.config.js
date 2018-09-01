const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
    mode: 'development',

    // Entry and output points
    entry: [
        'webpack-dev-server/client?http://client.timer.test',
        path.join(__dirname, 'src/index.js')
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath is necessary for HMR
        publicPath: '/'
    },

    // Plugins and loaders
    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.ejs' })
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
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
        extensions: [".js", ".jsx"],
        modules: [path.join(__dirname, "src"), "node_modules"]
    },

    // Dev configurations
    devtool: 'cheap-eval-source-map',
    devServer: {
        historyApiFallback: true,
        host: "0.0.0.0",
        port: 7000,
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/',
        disableHostCheck: true // Believe this is required for usage behind a proxy, see https://github.com/webpack/webpack-dev-server/releases/tag/v2.4.3
    }
};
