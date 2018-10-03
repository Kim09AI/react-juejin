/**
 * 使用react-loadable做路由懒加载时，如页面page-a
 * loadable可以找到page-a页面依赖的page-a.css
 * 当提取出公共的page-a~page-b.css时，page-a~page-b.css不会被loadable找到
 * 需要找出依赖关系手动注入
 */

const fs = require('fs')
const path = require('path')
const { prod: { publicPath } } = require('./config')

const prefixPath = `${publicPath}static/css/`
const getCssFile = files => files.filter(file => !file.endsWith('.map'))

const categoryCss = files => {
    // 从多个异步chunk的css中提取的公共部分
    // 如page-a.css和page-b.css有公共部分，提取出公共部分为page-a~page-b.css
    // 存放page-a~page-b.css这种类型的css
    const commonCss = []
    // 所有其他css
    const baseCss = []

    files.forEach(file => {
        if (file.includes('~')) {
            commonCss.push(file)
        } else {
            baseCss.push(file)
        }
    })

    return {
        baseCss,
        commonCss
    }
}

const dir = path.resolve(__dirname, '../dist/static/css')

fs.readdir(dir, (err, files) => {
    if (err) {
        return console.error(err)
    }

    const cssFiles = getCssFile(files)
    const { baseCss, commonCss } = categoryCss(cssFiles)

    const res = {}
    baseCss.forEach(file => {
        const name = file.split('.').shift()
        commonCss.forEach(commonFile => {
            if (commonFile.includes(name)) {
                res[file] || (res[file] = [])
                res[file].push(prefixPath + commonFile)
            }
        })
    })

    fs.writeFileSync(path.resolve(__dirname, '../dist/asyncCommonCss.json'), JSON.stringify(res, null, 4))
})
