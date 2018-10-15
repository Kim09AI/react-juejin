import { hostConfig } from './config'

export default {
    // 获取开源库
    getCustomRepos(before, limit = 20) {
        return this.get(`${hostConfig.repo}/getCustomRepos`, {
            params: {
                src: 'web',
                limit,
                before
            }
        })
    },

    // 获取沸点列表
    getPinList(before, limit = 20) {
        return this.get(`${hostConfig.shortMsg}/pinList/recommend`, {
            params: {
                src: 'web',
                limit,
                before
            }
        })
    }
}
