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
    },

    /**
     * 获取用户的沸点列表
     * @param {string} currentUid 登录用户的id
     * @param {string} uid 目标用户的id
     * @param {string} before
     * @param {number} limit
     */
    getUserPinList(currentUid, uid, before, limit = 20) {
        return this.get(`${hostConfig.shortMsg}/getUserList`, {
            params: {
                src: 'web',
                before,
                limit,
                currentUid,
                uid
            }
        })
    },

    // 获取活动轮播图
    getEventList({ pageNum, orderType = 'startTime', pageSize = 20, showBanner = 1, bannerStartTime } = {}) {
        return this.get(`${hostConfig.event}/getEventList`, {
            params: {
                src: 'web',
                orderType,
                pageNum,
                pageSize,
                showBanner,
                bannerStartTime
            }
        })
    },

    // 获取关注的标签
    getSubscribeTags({ targetUid, clientId, token, uid } = {}) {
        return this.get(`${hostConfig.gold}/user/${targetUid}/subscribe`, {
            headers: {
                'X-Juejin-Src': 'web',
                'X-Juejin-Client': clientId,
                'X-Juejin-Token': token,
                'X-Juejin-Uid': uid
            }
        })
    },

    // 关注tag
    subscribeTags({ tagId, clientId, token, uid } = {}) {
        return this.put(`${hostConfig.gold}/tag/subscribe/${tagId}`, null, {
            headers: {
                'X-Juejin-Src': 'web',
                'X-Juejin-Client': clientId,
                'X-Juejin-Token': token,
                'X-Juejin-Uid': uid
            }
        })
    },

    // 取消关注tag
    unSubscribeTags({ tagId, clientId, token, uid } = {}) {
        return this.delete(`${hostConfig.gold}/tag/subscribe/${tagId}`, {
            headers: {
                'X-Juejin-Src': 'web',
                'X-Juejin-Client': clientId,
                'X-Juejin-Token': token,
                'X-Juejin-Uid': uid
            }
        })
    }
}
