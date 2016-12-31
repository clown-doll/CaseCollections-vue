// 判断当前环境
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./webpack.config.prod')
} else {
    module.exports = require('./webpack.config.dev')
}