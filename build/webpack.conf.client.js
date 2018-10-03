const isDev = process.env.NODE_ENV === 'development'

module.exports = isDev ? require('./webpack.conf.client.dev') : require('./webpack.conf.client.prod')
