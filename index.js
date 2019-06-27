var express = require('express')
var proxy = require('http-proxy-middleware')
 
var app = express()
 
app.use('/api', proxy({
    target: 'https://www.sakugabooru.com',
    changeOrigin: true,
    pathRewrite: {'^/api' : ''}
 }))
app.use('/', express.static('public'))
app.listen(3000)
