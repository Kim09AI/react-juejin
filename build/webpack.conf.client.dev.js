const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
const base = require('./webpack.conf.base')
const config = require('./config')

const r = dir => path.resolve(__dirname, '..', dir)

const cssLoaders = (modulesCss) => {
    // 处理项目目录内的css
    const projectCssLoader = {
        loader: 'css-loader',
        options: {
            modules: config.common.cssModules,
            localIdentName: '[path]_[name]_[local]_[hash:base64:5]',
            sourceMap: true,
            importLoaders: 2,
            camelCase: true
        }
    }

    // 处理node_modules目录内的css
    const modulesCssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: true,
            importLoaders: 2
        }
    }

    return [
        'style-loader',
        modulesCss ? modulesCssLoader : projectCssLoader,
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
                        flexbox: 'no-2009',
                        remove: false
                    })
                ],
                sourceMap: true
            }
        },
        {
            loader: 'stylus-loader',
            options: {
                sourceMap: true,
                import: [
                    r('src/assets/styles/mixin.styl'),
                    r('src/assets/styles/variable.styl')
                ]
            }
        }
    ]
}

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
                oneOf: [
                    {
                        resource: /node_modules/,
                        use: cssLoaders(true)
                    },
                    {
                        use: cssLoaders(false)
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
            inject: false // 服务端渲染时手动注入
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                isClient: 'true',
                isServer: 'false'
            }
        }),
        new LoadablePlugin()
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
