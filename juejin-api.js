/* eslint-disable */

/**
 * 掘金api
 */

const api = {
    loginRequestUrl: 'https://juejin.im/auth/type/phoneNumber',
    notifyRequestUrl: 'https://ufp-api-ms.juejin.im/v1',
    bannerRequestUrl: 'https://banner-storage-ms.juejin.im/v1',
    timelineRequestUrl: 'https://timeline-merger-ms.juejin.im/v1',
    xiaoceRequestUrl: 'https://xiaoce-timeline-api-ms.juejin.im/v1',
    xiaoceCacheApiMs: 'https://xiaoce-cache-api-ms.juejin.im/v1',
    postStorageApiMsRequestUrl: 'https://post-storage-api-ms.juejin.im/v1',
    userLikeWrapperMsRequestUrl: 'https://user-like-wrapper-ms.juejin.im/v1',
    searchMergerMsRequestUrl: 'https://search-merger-ms.juejin.im/v1',
    collectionSetMsRequestUrl: 'https://collection-set-ms.juejin.im/v1',
    shortMsgMsRequestUrl: 'https://short-msg-ms.juejin.im/v1',
    ufpApiMsRequestUrl: 'https://ufp-api-ms.juejin.im/v1',
    lccroApiMsRequestUrl: 'https://lccro-api-ms.juejin.im/v1',
    entryViewStorageApiMsRequestUrl: 'https://entry-view-storage-api-ms.juejin.im/v1',
    goldTagMsRequestUrl: 'https://gold-tag-ms.juejin.im/v1',
    userNotificationApiMsRequestUrl: 'https://user-notification-api-ms.juejin.im/v1',
    apiRequestUrl: 'https://user-storage-api-ms.juejin.im/v1'
}

{
    /**
     * loginRequestUrl 手机登录
     * host https://juejin.im/auth/type/phoneNumber
     * method post
     * phoneNumber
     * password
     */
}

{
    /**
     * notifyRequestUrl 消息中心消息条数
     * host https://ufp-api-ms.juejin.im/v1
     * url /getUserNotificationNum
     * src web
     * uid
     * token
     */
}

{
    /**
     * bannerRequestUrl
     * host https://banner-storage-ms.juejin.im/v1
     * url /get_banner
     * position explore
     * page
     * pageSize 20
     * platform android
     * device_id
     * client_id
     * token
     * src android
     */
}

{
    /**
     * timelineRequestUrl 获取 timeline 推荐列表 翻页：将最后一条的 verifyCreatedAt 赋值给 before 字段即可
     * host https://timeline-merger-ms.juejin.im/v1
     * url /get_entry_by_timeline
     * src web
     * uid
     * token
     * limit
     * category all
     * recomment
     * before rankIndex
     */
}

{
    /**
     * timelineRequestUrl 热门推荐
     * host https://timeline-merger-ms.juejin.im/v1
     * url /get_entry_by_hot_recomment
     * src web
     * uid
     * token
     * limit
     * client_id
     * device_id
     */
}

{
    /**
     * timelineRequestUrl
     * 热门推荐点击刷新，将当前的 3 条文章 objectId 以 id|id|id 的格式发送请求，然后重新拉取热门推荐列表
     * 看抓包，热门推荐只返回 20 条，刷新一次移除三条，所以简单处理的话，user_filter_entry 之后直接将热门推荐数组的前三条移除即可；上面方式更精确，以防服务端之后又有什么返回呢
     * host https://timeline-merger-ms.juejin.im/v1
     * url /user_filter_entry
     * src web
     * uid
     * token
     * entryId [].join('|')
     * client_id
     * device_id
     */
}

{
    /**
     * timelineRequestUrl
     * host https://timeline-merger-ms.juejin.im/v1
     * url /get_entry_by_self
     * src android
     * uid
     * token
     * limit
     * client_id
     * device_id
     * order createdAt
     * before
     * type post || view
     * targetUid
     */
}

{
    /**
     * timelineRequestUrl 获取 entry 概要
     * host https://timeline-merger-ms.juejin.im/v1
     * url /get_entry_by_ids
     * src web
     * uid
     * token
     * device_id
     * entryIds
     */
}

{
    /**
     * timelineRequestUrl
     * host https://timeline-merger-ms.juejin.im/v1
     * url /get_entry_by_rank
     * src web
     * uid uid || 'unlogin'
     * token
     * limit
     * device_id
     * before
     */
}

{
    /**
     * xiaoceRequestUrl
     * host https://xiaoce-timeline-api-ms.juejin.im/v1
     * url /getListByLastTime
     * src web
     * uid
     * device_id
     * token
     * pageNum
     */
}

{
    /**
     * xiaoceCacheApiMs
     * host https://xiaoce-timeline-api-ms.juejin.im/v1
     * url /userBuyList
     * src web
     * uid
     * device_id
     * token
     */
}

{
    /**
     * postStorageApiMsRequestUrl 获取 post 概要、详情
     * host https://post-storage-api-ms.juejin.im/v1
     * url /getDetailData
     * src web
     * uid
     * device_id
     * token
     * type t === 1 ? 'entryView' : 'entry'
     * postId
     */
}

{
    /**
     * userLikeWrapperMsRequestUrl
     * host https://post-storage-api-ms.juejin.im/v1
     * url /user/${this.data.thirduid || auth.uid}/like/entry
     * page
     * pageSize
     */
}

{
    /**
     * collectionSetMsRequestUrl 用户创建的收藏集
     * host https://collection-set-ms.juejin.im/v1
     * url /getUserCollectionSet
     * src web
     * userId
     * clientId
     * token
     * page
     * targetUserId
     */
}

{
    /**
     * collectionSetMsRequestUrl 用户关注的收藏集
     * host https://collection-set-ms.juejin.im/v1
     * url /getFollowedCollectionSet
     * src web
     * userId
     * clientId
     * token
     * page
     * targetUserId
     */
}

{
    /**
     * shortMsgMsRequestUrl 热门推荐列表
     * host https://short-msg-ms.juejin.im/v1
     * url /getHotRecommendList
     * src web
     * uid
     * clientId
     * token
     * device_id
     */
}

{
    /**
     * shortMsgMsRequestUrl 沸点列表
     * host https://short-msg-ms.juejin.im/v1
     * url /pinList/recommend
     * src web
     * uid
     * token
     * device_id
     * before
     * limit
     */
}

{
    /**
     * shortMsgMsRequestUrl
     * host https://short-msg-ms.juejin.im/v1
     * url /getByID
     * src web
     * uid
     * token
     * device_id
     * msgId
     */
}

{
    /**
     * shortMsgMsRequestUrl 我赞过的沸点
     * host https://short-msg-ms.juejin.im/v1
     * url /getUserLikedList
     * src web
     * uid
     * token
     * device_id
     * client_id
     * page
     * pageSize
     * before
     */
}

{
    /**
     * shortMsgMsRequestUrl 我的沸点
     * host https://short-msg-ms.juejin.im/v1
     * url /getUserList
     * src web
     * uid
     * token
     * device_id
     * currentUid
     * before
     * limit
     */
}

{
    /**
     * ufpApiMsRequestUrl
     * host https://ufp-api-ms.juejin.im/v1
     * url /getUserLog
     * src web
     * uid
     * token
     * before
     */
}

{
    /**
     * ufpApiMsRequestUrl
     * host https://ufp-api-ms.juejin.im/v1
     * url /getUserNotification
     * src web
     * uid
     * token
     * before
     */
}

{
    /**
     * lccroApiMsRequestUrl
     * host https://lccro-api-ms.juejin.im/v1
     * url /get_multi_user
     * src web
     * uid
     * token
     * device_id
     * ids
     * cols objectId|username|avatar_large|avatarLarge|role|company|jobTitle|self_description|selfDescription|blogAddress|isUnitedAuthor|isAuthor|authData|totalHotIndex|postedEntriesCount|postedPostsCount|collectedEntriesCount|likedPinCount|collectionSetCount|subscribedTagsCount|followeesCount|followersCount|pinCount
     */
}

{
    /**
     * entryViewStorageApiMsRequestUrl
     * host https://entry-view-storage-api-ms.juejin.im/v1
     * url /getEntryView
     * src web
     * entryId
     * token
     * device_id
     */
}

{
    /**
     * goldTagMsRequestUrl
     * host https://gold-tag-ms.juejin.im/v1
     * url /user/${this.data.thirduid || auth.uid}/subscribe
     * headers
     * X-Juejin-Src web
     * X-Juejin-Client
     * X-Juejin-Token
     * X-Juejin-Uid
     */
}

{
    /**
     * goldTagMsRequestUrl 获取推荐标签
     * host https://gold-tag-ms.juejin.im/v1
     * url /tags/type/hot/suggest/category/page/${page}/pageSize/100
     * headers
     * X-Juejin-Src web
     * X-Juejin-Client
     * X-Juejin-Token
     * X-Juejin-Uid
     */
}

{
    /**
     * goldTagMsRequestUrl 获取所有标签
     * host https://gold-tag-ms.juejin.im/v1
     * url /tags/type/hot/suggest/tag/page/${page}/pageSize/100
     * headers
     * X-Juejin-Src web
     * X-Juejin-Client
     * X-Juejin-Token
     * X-Juejin-Uid
     */
}

{
    /**
     * goldTagMsRequestUrl
     * host https://gold-tag-ms.juejin.im/v1
     * url /user/${this.data.thirduid || auth.uid}/subscribe
     * headers
     * X-Juejin-Src web
     * X-Juejin-Client
     * X-Juejin-Token
     * X-Juejin-Uid
     */
}

{
    /**
     * userNotificationApiMsRequestUrl 获取系统消息
     * host https://user-notification-api-ms.juejin.im/v1
     * url getSystemNotification
     * uid
     * token
     * src web
     * device_id
     * pointer
     */
}

{
    /**
     * apiRequestUrl 获取用户信息
     * host https://user-storage-api-ms.juejin.im/v1
     * url /getUserInfo
     * uid
     * token
     * src web
     * device_id
     * current_uid
     */
}
