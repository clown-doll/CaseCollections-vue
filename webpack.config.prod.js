/*
* @Author: Administrator
* @Date:   2016-12-31 17:16:00
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-06 18:57:46
*/

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['vue', 'vuex', 'vue-router'],
        bundle: './src/index'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[hash:8].[name].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            //filename:"vendor.js",
            minChunks: Infinity //Infinity
        }),
        new ExtractTextPlugin('[hash:8].style.css', { allChunks: true }),
        new HtmlWebpackPlugin({
            favicon:path.join(__dirname,'src/favicon.ico'),
            title: "创意汇-99编辑部",
            template: path.join(__dirname,'src/index.html'),
            inject:'body',
            hash: false,  //为静态资源生成hash值
            minify:{  //压缩HTML文件
                removeComments:false,  //移除HTML中的注释
                collapseWhitespace:true  //删除空白符与换行符
            }
        })
    ],
    module: {
        preLoaders: [
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
        ],
        loaders: [
            {test: /\.vue$/,loader: 'vue', include: path.join(__dirname,'src')},
            {test: /\.js$/, loader: 'babel', exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap' ) },
            {test: /\.(jpe?g|png|gif)$/i, loaders: [
                'url?limit=10000&name=images/[hash:8].[name].[ext]',
                'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
            ]},
            {test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'}
        ]
    },
    vue: {
        loaders: {
            js: 'babel!eslint'
        }
    },
    resolve: {
        root: path.resolve(__dirname, 'node_modules'),
        extensions: ['','.js','.vue','.scss']
    }
};