const proxy = require('koa-server-http-proxy');
module.exports = function(app){
    app.use(proxy('/api', {
        target: 'http://192.168.1.51:8088',
        pathRewrite: {
            '^/api': ''
        },
        changeOrigin: true
    }))
}
