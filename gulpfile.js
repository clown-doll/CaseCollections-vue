var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util'); //工具库-log
var WebpackDevServer = require('webpack-dev-server'); //实时刷新
var webpack = require('webpack');
var del = require('del'); //删除文件夹内容
var env = require('gulp-env'); //环境变量设置
var gulpSequence = require('gulp-sequence'); //控制任务执行顺序
var nodemon = require('gulp-nodemon'); //自动启动
var open = require('open'); //打开文件或链接

var DEV_PORT = 3000,
    PROD_PORT = 8400;

// 启动webpack及webpack-dev-server
gulp.task('serve', function () {
    var webpackConfig = require('./webpack.config');
    var myConfig = Object.create(webpackConfig);

    myConfig.entry.unshift('webpack/hot/only-dev-server');
    myConfig.entry.unshift('webpack-dev-server/client?http://localhost:' + DEV_PORT);

    new WebpackDevServer(webpack(myConfig), {
        noInfo: false,
        hot: true,
        inline: true,
        historyApiFallback: true,
        publicPath: myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(DEV_PORT, 'localhost', function (err) {
        if(err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', '==> 🌎  http://localhost:' + DEV_PORT);
        open('http://localhost:' + DEV_PORT);
    })
});

// 清楚旧文件
gulp.task('clean', function () {
    del([path.join(__dirname, '/dist/*')]);
});

// 设置环境变量
gulp.task('set-env-prod', function () {
    env({
        vars: {
            'NODE_ENV': 'production'
        }
    })
});

// webpack
gulp.task('webpack', function (callback) {
    var config = require('./webpack.config');

    webpack(config, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }

        gutil.log('[webpack]', stats.toString({}));

        callback();
    });
});

// 执行webpack任务前，先执行环境变量配置
gulp.task('webpack:dist', gulpSequence('set-env-prod', 'webpack'));

// 打包前，先执行清除动作
gulp.task('build', gulpSequence('clean', 'webpack:dist'));

// node应用程序实时重启
gulp.task('nodemon', function () {
    nodemon({
        script: path.join(__dirname, '/server.js'),
        ext: 'js',
        watch: [
            path.join(__dirname, '/dist')
        ],
        env: { 'NODE_ENV': 'production', 'PORT': PROD_PORT }
    })
});

gulp.task('serve:dist',gulpSequence('build','nodemon'));