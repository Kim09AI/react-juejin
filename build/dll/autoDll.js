/**
 * 构建时自动生成dll
 */
const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const config = require('./webpack.conf.dll')
const { dependencies } = require('../../package')
const modules = require('./modules')

const versionsPath = path.resolve(__dirname, 'versions.json')
const versions = getVersions()
const oldVersions = getOldVersions()

const matched = isModulesMatch()

if (!matched) {
    buildDll()
} else {
    console.log('dll已存在')
}

// 判断是否需要生成dll或者更新dll
function isModulesMatch() {
    if (Object.keys(oldVersions).length !== Object.keys(versions).length) {
        return false
    }

    const _versions = JSON.stringify(versions)
    const _oldVersions = JSON.stringify(oldVersions)

    if (_versions !== _oldVersions) {
        return false
    }

    return true
}

function buildDll() {
    // 删除之前生成的dll文件
    if (fs.existsSync(path.resolve(__dirname, './bundle-conf.json'))) {
        const oldDllFileName = require('./bundle-conf.json').base.js
        const dllPath = path.resolve(__dirname, '../../public', oldDllFileName)

        if (fs.existsSync(dllPath)) {
            fs.unlinkSync(dllPath)
        }
    }

    webpack(config, (err, stats) => {
        if (err) throw err

        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(warn => console.warn(warn))

        console.log('dll build success')

        fs.writeFileSync(versionsPath, JSON.stringify(versions, null, 4))
    })
}

function getOldVersions() {
    if (!fs.existsSync(versionsPath)) {
        return {}
    }

    return require(versionsPath)
}

function getVersions() {
    const versions = {}
    modules.sort().forEach(module => {
        const version = dependencies[module]
        versions[module] = version
    })

    return versions
}
