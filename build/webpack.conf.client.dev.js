const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const base = require('./webpack.conf.base')
const config = require('./config')

const r = dir => path.resolve(__dirname, '..', dir)

module.exports = merge(base, {
    mode: 'development',
    devtool: '#cheap-module-source-map',
    entry: {
        app: ['react-hot-loader/patch', './src/entry-client.js']
    },
    output: {
        filename: 'static/js/[name].js',
        path: r('dist'),
        publicPath: config.dev.publicPath,
        chunkFilename: 'static/js/[name].js'
    },
    resolve: {
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                },
                include: r('src')
            },
            {
                test: /\.(css|styl)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: config.common.cssModules,
                            localIdentName: '[path]_[name]_[local]_[hash:5]',
                            sourceMap: true,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                require('autoprefixer')({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9'
                                    ],
                                    flexbox: 'no-2009'
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'stylus-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    parser: require('postcss-safe-parser')
                }
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: r('public/index.template.html'),
            inject: true
        }),
        new HtmlWebpackPlugin({
            filename: 'server.ejs',
            template: '!!ejs-compiled-loader!' + r('public/server.template.ejs'),
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                isClient: 'true',
                isServer: 'false'
            }
        })
    ],
    devServer: {
        contentBase: r('public'),
        host: '0.0.0.0',
        port: 9000,
        overlay: {
            errors: true,
            warnings: false
        },
        hot: true,
        publicPath: config.dev.publicPath,
        historyApiFallback: {
            rewrites: [
                { from: /^\//, to: `${config.dev.publicPath}index.html` }
            ]
        },
        open: false,
        inline: true
    }
})
