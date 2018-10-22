const express = require('express')
const path = require('path')
const Loadable = require('react-loadable')
const proxy = require('http-proxy-middleware')
const cookieParser = require('cookie-parser')
const config = require('./config')

const app = express()

const isDev = process.env.NODE_ENV === 'development'

app.use(cookieParser())

// 代理掘金数据接口
app.use('/api', proxy(config.proxyOptions))

if (isDev) {
    app.use(express.static(path.resolve(__dirname, '../public')))

    // 代理到webpack-dev-server服务器
    app.use('/public', proxy({
        target: 'http://localhost:9000',
        changeOrigin: true
    }))

    const devRender = require('./ssr/devRender')
    app.get('*', devRender)
} else {
    app.use(express.static(path.resolve(__dirname, '../dist')))

    const prodRender = require('./ssr/prodRender')
    app.get('*', prodRender)
}

app.use((req, res, next) => {
    res.status(404).send({
        success: false,
        msg: req.originalUrl + 'Not Found'
    })
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    if (isDev) {
        console.log(err)
        res.status(status).send(err.message)
    } else {
        res.status(status).send('发生未知错误，请稍后重试')
    }
})

const port = process.env.PORT || 3000
Loadable.preloadAll().then(() => {
    app.listen(port, () => console.log(`server running on http://localhost:${port}`))
})
