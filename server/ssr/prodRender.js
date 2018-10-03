const fs = require('fs')
const path = require('path')
const render = require('./render')

const serverBundle = require('../../dist/server.bundle')
const template = fs.readFileSync(path.resolve(__dirname, '../../dist/server.ejs'), 'utf-8')
const stats = require('../../dist/react-loadable.json')

module.exports = function prodRender(req, res, next) {
    render(template, serverBundle, req, res, next, stats)
}
