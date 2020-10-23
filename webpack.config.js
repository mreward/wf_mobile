/* eslint-disable import/no-dynamic-require */
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const StatsPlugin = require('stats-webpack-plugin')

const isScriptInit = process.env.npm_lifecycle_event === 'mwallet-init'

let wallet = {
    name: ''
}
try {
    wallet = require('./wallets.config.js').wallet
    console.log(wallet.applications)
} catch (e) {
    console.log(e)
    if (!isScriptInit && e.code === 'MODULE_NOT_FOUND') {
        console.warn('\nERROR: wallets.config.js not found\nPlease init mWalet-platform: "yarn mwallet-init"\n')
        process.exit(1)
    } else if (!isScriptInit) {
        throw e
    }
}

let contentIndexHtml = ''
if (wallet.name) {
    contentIndexHtml = require('fs').readFileSync(`./projects/${wallet.name}/src/index.hbs`, 'utf8')
}

const webpackConfig = {
    mode: 'development',
    entry: wallet.autoGenerationConfig ? './CORE/__configs.generate__/main.js' : `./projects/${wallet.name}/src/main.js`,
    output: {
        path: path.resolve(__dirname, `./projects/${wallet.name}/www/`),
        publicPath: '',
        filename: 'build.js',
        library: 'mWallet'
    },
    watchOptions: {
        ignored: [
            path.resolve(__dirname, `./projects/${wallet.name}/www`),
            path.resolve(__dirname, `./projects/${wallet.name}/platforms`),
            path.resolve(__dirname, `./projects/${wallet.name}/plugins`)
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: function(file) {
                    return (/node_modules/.test(file) &&
                        !/\.vue\.js/.test(file))
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 1,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=1&minetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                loader: 'vue-style-loader!css-loader'
            },

            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },

            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'vue-style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                path.resolve(__dirname, 'node_modules')
                            ]
                        }
                    }]
            },

            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            // vue$: 'vue/dist/vue.esm.js',
            _CORE: path.resolve(__dirname, 'CORE'),
            _PLUGINS: path.resolve(__dirname, 'CORE/plugins'),
            _MODULES: path.resolve(__dirname, 'CORE/modules'),
            _PROJECT: path.resolve(__dirname, ''),
            _PROJECT_APP: path.resolve(__dirname, `projects/${wallet.name}`),
            _SRC_IMG_WALLET: path.resolve(__dirname, `projects/${wallet.name}/src/img`)
        }
    },
    plugins: [
        new CleanWebpackPlugin([`projects/${wallet.name}/www/`], {
            root: __dirname,
            verbose: true,
            dry: false,
            exclude: ['index.html']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './CORE/project-template/index.hbs',
            templateParameters: {
                content: contentIndexHtml
            },
            title: wallet.application.nameApp,
            inject: 'body',
            chunksSortMode: 'none',
            meta: {
                viewport: 'width=device-width,height=device-height, minimum-scale=1.0, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
            }
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['cordova.js'],
            append: false
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new FriendlyErrorsPlugin(),
        new webpack.DefinePlugin({
            _DEVMOD: JSON.stringify(process.env.DEVMOD),
            _LOG: JSON.stringify(process.env.LOG)
        }),
        new VueLoaderPlugin(),
        new StatsPlugin('../../../stats.json', {
            exclude: [/node_modules/],
            maxModules: 100000
        })
        // new BundleAnalyzerPlugin(),
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        // inline: true,
        port: process.env.PORT || 8080
    },
    performance: {
        hints: false
    },

    devtool: 'eval-source-map',

    optimization: {
        splitChunks: {
            // include all types of chunks
            chunks: 'all',
            name: 'vendor',
            automaticNameDelimiter: '~'
        }
    }
}

if (!isScriptInit) {
    // Реестр страниц
    const registerJS = path.resolve(__dirname, `projects/${wallet.name}/src/register.js`)
    const _registerBase = require(path.resolve(__dirname, 'CORE/register.base.js'))
    const _register = require(registerJS) // eslint-disable-line import/no-dynamic-require

    webpackConfig.resolve.alias = wallet.autoGenerationConfig ? {
        ...webpackConfig.resolve.alias,
        ..._registerBase(__dirname),
        ..._register(__dirname)
    } : {
        ...webpackConfig.resolve.alias,
        ..._register(__dirname)
    }

    console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
    if (process.env.NODE_ENV === 'production') {
        webpackConfig.mode = 'production'
        webpackConfig.devtool = false
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        ])
    }
}
module.exports = webpackConfig
console.log('------WEBPACK INIT------', process.env.CI_HOCKEYAPP_TOKEN)
