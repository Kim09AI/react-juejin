import axios from 'axios'
import qs from 'qs'

const instance = axios.create()

instance.interceptors.request.use(config => config, err => Promise.reject(err))
instance.interceptors.response.use(res => res, err => Promise.reject(err))

class Service {
    constructor(cookie = '') {
        this.cookie = cookie
    }

    get(url, config = {}) {
        const headers = process.env.isServer
            ? { ...config.headers, cookie: this.cookie }
            : { ...config.headers }

        return instance.get(url, {
            ...config,
            headers
        })
    }

    post(url, data, config = {}) {
        const headers = process.env.isServer
            ? { ...config.headers, cookie: this.cookie }
            : { ...config.headers }

        return instance.post(url, qs.stringify(data), {
            ...config,
            headers
        })
    }
}

export function createSSRApi(cookie) {
    return new Service(cookie)
}

export default new Service()
