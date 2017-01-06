/*
* @Author: Administrator
* @Date:   2016-12-31 17:16:00
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-06 18:57:40
*/

// 判断当前环境
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./webpack.config.prod')
} else {
    module.exports = require('./webpack.config.dev')
}