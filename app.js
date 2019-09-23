// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const path = require('path');
const proxyHttp = require("./proxyConfig")
const fs = require('fs');
const Router = require('koa-router');
const Log = new require("./logo");
const router = new Router();
const staticFiles = require('koa-static')
const LogClass =new Log();
const render = (page) => {
    let viewUrl = `./public/${page}`
    let html = null
    fs.readFile(viewUrl, "binary", (err, data) => {
        if (err) {
            reject(err)
        } else {
            html = data;

        }

    })
    return html
}

router.all('*',function (ctx, next) {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , myheader');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

LogClass.open();

// 创建一个Koa对象表示web app本身:
const app = new Koa();
app.use(staticFiles(path.resolve(__dirname, "./public")));

router.get('*',   (ctx, next)=> {
    LogClass.add(JSON.stringify(ctx));
    ctx.body = fs.readFileSync("./public/index.html","utf-8")
})



proxyHttp(app)
app.use(router.routes()).use(router.allowedMethods());
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
