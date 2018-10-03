const url = require('url')
const ReactDOMServer = require('react-dom/server')
const ejs = require('ejs')
const Helmet = require('react-helmet').Helmet
const serialize = require('serialize-javascript')
const getBundles = require('react-loadable/webpack').getBundles
const loadOnServer = require('redux-connect').loadOnServer
let asyncCommonCss

if (process.env.NODE_ENV === 'production') {
    asyncCommonCss = require('../../dist/asyncCommonCss')
}

const injectBundles = (stats, modules, template) => {
    const bundles = getBundles(stats, modules)

    // 对懒加载的资源进行过滤去重
    let cssBundles = bundles
        .filter(bundle => bundle.publicPath.endsWith('.css'))
        .reduce((result, bundle) => {
            // 注入提取出的async common css
            for (let css in asyncCommonCss) {
                if (bundle.publicPath.includes(css)) {
                    result.push(...asyncCommonCss[css])
                }
            }

            result.push(bundle.publicPath)
            return result
        }, [])

    cssBundles = Array.from(new Set(cssBundles))
        .map(publicPath => `<link rel="stylesheet" type="text/css" href="${publicPath}">`)
        .join('')

    const jsBundles = bundles
        .filter(bundle => bundle.publicPath.endsWith('.js'))
        .reduce((result, bundle) => {
            result.indexOf(bundle.publicPath) === -1 && result.push(bundle.publicPath)
            return result
        }, [])
        .map(publicPath => `<script src="${publicPath}"></script>`)
        .join('')

    // 把懒加载的资源添加到模板中
    template = template
        .replace(/(<\/head>)/, `${cssBundles}$1`)
        .replace(/(<script[^>]+app\.[\d\w]+\.js[^>]?><\/script>)/, `${jsBundles}$1`)

    return template
}

module.exports = async (template, serverBundle, req, res, next, stats) => {
    try {
        const modules = []
        const routerContext = {}
        const { default: createApp, createStore, routes, createSSRApi } = serverBundle
        const location = url.parse(req.url)
        const store = createStore()
        const api = createSSRApi(req.headers.cookie)
        const helpers = { api }

        store.dispatch.api.initApi(api)

        loadOnServer({ store, location, routes })
            .then(() => {
                const app = createApp(req.url, routerContext, store, modules, helpers)
                const appString = ReactDOMServer.renderToString(app)

                if (routerContext.url) {
                    res.writeHead(302, {
                        Location: routerContext.url
                    })
                    res.end()
                    return
                }

                const helmet = Helmet.renderStatic()

                if (stats) {
                    template = injectBundles(stats, modules, template)
                }

                const html = ejs.render(template, {
                    appString,
                    meta: helmet.meta.toString(),
                    link: helmet.link.toString(),
                    style: helmet.style.toString(),
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
