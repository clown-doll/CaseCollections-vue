/*
* @Author: Administrator
* @Date:   2016-12-31 17:16:00
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-06 18:57:16
*/

var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');

var app = new express();
var port = process.env.PORT || 8400;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));

app.get('/*', function (req, res) {
    return res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    }
});
