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

    // 获取用户信息详情(只能获取自己的)
    getUserInfo(currentUid) {
        return this.get(`${hostConfig.user}/getUserInfo`, {
            params: {
                src: 'web',
                current_uid: currentUid
            }
        })
    },

    // 获取用户信息(可以获取所有人的)
    getUserInfoByIds(ids, cols = COLS) {
        return this.get(`${hostConfig.lccro}/get_multi_user`, {
            params: {
                src: 'web',
                ids,
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
    },

    // 获取用户动态
    getUserLog(uid, before) {
        return this.get(`${hostConfig.ufp}/getUserLog`, {
            params: {
                src: 'web',
                uid,
                before
            }
        })
    },

    // 检查自己是否关注了该用户
    checkCurrentUserFollow(currentUid, targetUids) {
        return this.get(`${hostConfig.follow}/isCurrentUserFollowed`, {
            params: {
                src: 'web',
                currentUid,
                targetUids
            }
        })
    },

    /**
     * 关注用户
     * @param {string} followee 被关注者
     * @param {string} follower 关注者
     */
    currentUserFollow(followee, follower) {
        return this.get(`${hostConfig.follow}/follow`, {
            params: {
                src: 'web',
                followee,
                follower
            }
        })
    },

    /**
     * 取消关注
     * @param {string} followee 被关注者
     * @param {string} follower 关注者
     */
    currentUserUnFollow(followee, follower) {
        return this.get(`${hostConfig.follow}/unfollow`, {
            params: {
                src: 'web',
                followee,
                follower
            }
        })
    }
}
