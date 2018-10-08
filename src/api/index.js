import axios from 'axios'
import qs from 'qs'
import { merge } from 'lodash-es'
import post from './post'
import user from './user'
import books from './books'
import other from './other'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

const hostConfig = {
    timeline: '/timeline',
    xiaoce: '/xiaoce',
    repo: '/repo',
    shortMsg: '/shortMsg',
    post: '/post',
    comment: '/comment',
    juejin: '/juejin',
    user: '/user'
}

const serviceConfig = [
    post,
    user,
    books,
    other
]

const instance = axios.create({
    baseURL: process.env.isClient ? '/api' : `http://${host}:${port}/api`
})

instance.interceptors.request.use(config => config, err => Promise.reject(err))
instance.interceptors.response.use(res => res, err => Promise.reject(err))

class Service {
    constructor(userInfo) {
        this.userInfo = userInfo
    }

    get(url, config = {}) {
        const params = Object.assign({}, config.params, {
            ...this.userInfo,
            device_id: this.userInfo ? this.userInfo.clientId : undefined
        })

        return instance.get(url, {
            ...config,
            params
        })
    }

    post(url, data, config = {}) {
        const _data = Object.assign({}, data, {
            ...this.userInfo,
            device_id: this.userInfo ? this.userInfo.clientId : undefined
        })

        return instance.post(url, qs.stringify(_data), config)
    }

    clearUserInfo() {
        this.userInfo = null
    }
}

// 添加数据获取的方法到Service的原型
merge(Service.prototype, ...serviceConfig.map(item => item(hostConfig)))

export function createSSRApi(userInfo) {
    return new Service(userInfo)
}

export default new Service()
