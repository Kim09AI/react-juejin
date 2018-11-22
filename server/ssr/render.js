const url = require('url')
const ReactDOMServer = require('react-dom/server')
const ejs = require('ejs')
const Helmet = require('react-helmet').Helmet
const serialize = require('serialize-javascript')
const loadOnServer = require('redux-connect').loadOnServer
const ChunkExtractor = require('@loadable/server').ChunkExtractor

module.exports = async (template, serverBundle, stats, req, res, next) => {
    try {
        const routerContext = {}
        const { default: createApp, createStore, routes, createSSRApi } = serverBundle
        const location = url.parse(req.url)
        const store = createStore()

        const userInfo = JSON.parse(req.cookies.userInfo || null)
        const api = createSSRApi(userInfo)
        const helpers = { api }

        store.dispatch.api.initApi(api)
        // 同步用户数据
        userInfo && await store.dispatch.user.syncUserDetailForSSR(userInfo)

        loadOnServer({ store, location, routes })
            .then(() => {
                const webExtractor = new ChunkExtractor({ stats: stats, entrypoints: ['app'] })

                const app = createApp(req.url, routerContext, store, helpers, webExtractor)
                const appString = ReactDOMServer.renderToString(app)

                if (routerContext.url) {
                    res.writeHead(302, {
                        Location: routerContext.url
                    })
                    res.end()
                    return
                }

                const helmet = Helmet.renderStatic()

                const html = ejs.render(template, {
                    appString,
                    meta: helmet.meta.toString(),
                    link: webExtractor.getLinkTags() + helmet.link.toString(),
                    style: webExtractor.getStyleTags() + helmet.style.toString(),
                    script: webExtractor.getScriptTags(),
                    title: helmet.title.toString(),
                    initalState: serialize(store.getState())
                })
                res.send(html)
            })
            .catch(next)
    } catch (err) {
        next(err)
    }
}
