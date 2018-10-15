const path = require('path')
const webpack = require('webpack')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const modules = require('./modules')

module.exports = {
    mode: 'production',
    entry: {
        base: modules
    },
    output: {
        path: path.resolve(__dirname, '../../public'),
        filename: 'dll.[name].[chunkhash:8].js',
        library: '[name]'
    },
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                        beautify: false
                    },
                    compress: {
                        warnings: false
                    }
                },
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '[name]-manifest.json'),
            name: '[name]'
        }),
        new AssetsPlugin({
            filename: 'bundle-conf.json',
            path: path.resolve(__dirname, '.')
        })
    ]
}
