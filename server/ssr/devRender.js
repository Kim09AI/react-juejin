const webpack = require('webpack')
const path = require('path')
const MFS = require('memory-fs')
const vm = require('vm')
const NativeModule = require('module')
const Loadable = require('react-loadable')
const axios = require('axios')
const render = require('./render')
const serverConfig = require('../../build/webpack.conf.server')

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:9000/public/server.ejs')
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
}

/**
 * 对于node_modules中的模块使用require，其他打包在内存的js则额外处理
 * @param {object} fileSystem 文件系统
 * @param {string} basePath 文件基础目录
 * @returns {object} module.exports的返回值
 */
const createRequire = (fileSystem, basePath) => {
    const _require = (pathname) => {
        const isAbsolute = path.isAbsolute(pathname)
        const isRelative = pathname.startsWith('.')

        // 不是绝对路径且不是相对路径，说明时node_modules中的模块
        if (!isAbsolute && !isRelative) {
            return require(pathname)
        }

        const absolutePath = path.resolve(basePath, pathname)
        let content = fileSystem.readFileSync(absolutePath, 'utf-8')

        const m = { exports: {} }
        // 对文件内容添加一层wrap
        // (function (exports, require, module, __filename, __dirname) { 文件内容 })
        const wrap = NativeModule.wrap(content)
        // 把字符串编译成可执行的代码
        const script = new vm.Script(wrap, {
            displayErrors: true,
            filename: pathname
        })
        // 指定运行环境
        const result = script.runInThisContext()
        // 执行(function (exports, require, module, __filename, __dirname) { 文件内容 })
        // 把代码执行结果挂载到module.exports上
        try {
            result.call(m.exports, m.exports, _require, m)
        } catch (err) {
            console.log(err)
        }

        return m.exports
    }

    return _require
}

let serverBundle
const complier = webpack(serverConfig)
const mfs = new MFS()
const _require = createRequire(mfs, serverConfig.output.path)
complier.outputFileSystem = mfs
complier.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.warn(warn))

    serverBundle = _require('./' + serverConfig.output.filename)
    console.log('server bundle complie success')
})

module.exports = function devRender(req, res, next) {
    if (!serverBundle) {
        return res.send('waiting for compile, refresh later!')
    }

    // 预加载好所有使用Loadable做代码分割的bundle
    Promise.all([
        getTemplate(),
        Loadable.preloadAll()
    ])
        .then(([template]) => {
            render(template, serverBundle, req, res, next)
        })
        .catch(next)
}
