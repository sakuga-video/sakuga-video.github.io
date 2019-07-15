var express = require('express')
var proxy = require('http-proxy-middleware')
 
var app = express()

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.use('/api', proxy({
    target: 'https://www.sakugabooru.com',
    changeOrigin: true,
    pathRewrite: {'^/api' : ''}
 }))
app.use('/', express.static('public'))
app.listen(port)
