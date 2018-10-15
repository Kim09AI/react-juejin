import { hostConfig } from './config'

// eslint-disable-next-line
const COLS = 'viewedEntriesCount|role|totalCollectionsCount|allowNotification|subscribedTagsCount|appliedEditorAt|email|followersCount|postedEntriesCount|latestCollectionUserNotification|commentedEntriesCount|weeklyEmail|collectedEntriesCount|postedPostsCount|username|latestLoginedInAt|totalHotIndex|blogAddress|selfDescription|latestCheckedNotificationAt|emailVerified|totalCommentsCount|installation|blacklist|weiboId|mobilePhoneNumber|apply|followeesCount|deviceType|editorType|jobTitle|company|latestVoteLikeUserNotification|authData|avatarLarge|mobilePhoneVerified|objectId|createdAt|updatedAt'

export default {
    // 手机登录
    loginByPhoneNumber(phoneNumber, password) {
        return this.post(`${hostConfig.juejin}/auth/type/phoneNumber`, {
            phoneNumber,
            password
        })
    },

    // 获取用户信息详情
    getUserInfo(currentUid) {
        return this.get(`${hostConfig.user}/getUserInfo`, {
            params: {
                src: 'web',
                current_uid: currentUid
            }
        })
    },

    // 获取其他用户信息
    getOtherUserInfo(userId, cols = COLS) {
        return this.get(`${hostConfig.lccro}/get_multi_user`, {
            params: {
                src: 'web',
                ids: userId,
                cols
            }
        })
    },

    // 获取是否有通知
    getUserNotificationNum() {
        return this.get(`${hostConfig.ufp}/getUserNotificationNum`, {
            params: {
                src: 'web'
            }
        })
    }
}
