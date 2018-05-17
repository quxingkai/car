const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const plugins = [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
        filename:"[name].css"
    }),
    new HtmlWebpackPlugin({
        filename:"../index.html",
        template:"./src/index.html"
    })
]

module.exports = {
    mode:"development",
    entry:{
        index:"./src/js/index.js"
    },
    devtool:"evel-source-map",
    output:{
        filename:"[name].js",
        path: path.resolve(__dirname,'build/assets')
    },
    devServer:{
        port:9988,
        open:true,
        contentBase:'./build'
    },
    module:{
        rules:[{
            test:/\.css$/,
            use:[MiniCssExtractPlugin.loader,'css-loader']
        },{
            test:/\.scss$/,
            use:[MiniCssExtractPlugin.loader,'css-loader','sass-loader']
        },{
            test:/\.vue$/,
            loader : "vue-loader"
        }]
    },
    plugins,
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                }
            }
        }
    }
}