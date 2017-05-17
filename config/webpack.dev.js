//开发模式下 webpack 配置
//develop webpack config
var webpack=require('webpack')
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: helpers.root('dist'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    
    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        host:'0.0.0.0',
        port: 8111,
        contentBase:'src/'
    },
});
