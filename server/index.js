const express = require('express')
const path = require('path')
const Loadable = require('react-loadable')
const proxy = require('http-proxy-middleware')
const cookieParser = require('cookie-parser')

const app = express()

const isDev = process.env.NODE_ENV === 'development'

app.use(cookieParser())

app.use('/api', proxy({
    target: 'https://juejin.im',
    changeOrigin: true,
    pathRewrite: {
        '^/api/timeline': '/',
        '^/api/xiaoce': '/',
        '^/api/repo': '/',
        '^/api/shortMsg': '/',
        '^/api/post': '/',
        '^/api/comment': '/',
        '^/api/juejin': '/',
        '^/api/user': '/'
    },
    router({ url }) {
        const prefix = url.split('/')[2]

        const hostConfig = {
            timeline: 'https://timeline-merger-ms.juejin.im/v1',
            xiaoce: 'https://xiaoce-timeline-api-ms.juejin.im/v1',
            repo: 'https://repo-ms.juejin.im/v1',
            shortMsg: 'https://short-msg-ms.juejin.im/v1',
            post: 'https://post-storage-api-ms.juejin.im/v1',
            comment: 'https://comment-wrapper-ms.juejin.im/v1',
            juejin: 'https://juejin.im',
            user: 'https://user-storage-api-ms.juejin.im/v1'
        }

        return hostConfig[prefix]
    }
}))

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
        res.status(status).send(err)
    } else {
        res.status(status).send('发生未知错误，请稍后重试')
    }
})

const port = process.env.PORT || 3000
Loadable.preloadAll().then(() => {
    app.listen(port, () => console.log(`server running on http://localhost:${port}`))
})
