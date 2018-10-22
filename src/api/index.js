import axios from 'axios'
import qs from 'qs'
import { merge } from 'lodash-es'
import post from './post'
import user from './user'
import books from './books'
import other from './other'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

const serviceConfig = [
    post,
    user,
    books,
    other
]

const instance = axios.create({
    baseURL: process.env.isClient ? '/api' : `http://${host}:${port}/api`,
    timeout: 10000
})

instance.interceptors.request.use(config => config, err => Promise.reject(err))
instance.interceptors.response.use(res => res, err => Promise.reject(err))

class Service {
    constructor(userInfo) {
        this.userInfo = userInfo
        if (userInfo && userInfo.clientId) {
            this.userInfo.device_id = userInfo.clientId
        }
    }

    get(url, config = {}) {
        const params = Object.assign({}, this.userInfo, config.params)

        return instance.get(url, {
            ...config,
            params
        })
    }

    post(url, data, config = {}) {
        const _data = Object.assign({}, this.userInfo, data)

        return instance.post(url, qs.stringify(_data), config)
    }

    put(url, data, config = {}) {
        const _data = Object.assign({}, this.userInfo, data)

        return instance.put(url, qs.stringify(_data), config)
    }

    delete(url, config = {}) {
        const params = Object.assign({}, this.userInfo, config.params)

        return instance.delete(url, {
            ...config,
            params
        })
    }

    setUserInfo(userInfo) {
        this.userInfo = userInfo
    }
}

// 添加数据获取的方法到Service的原型
merge(Service.prototype, ...serviceConfig)

export function createSSRApi(userInfo) {
    return new Service(userInfo)
}

export default new Service()
