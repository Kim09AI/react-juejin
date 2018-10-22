import { hostConfig } from './config'

export default {
    // 获取文章
    getEntry({ limit = 20, category = 'all', before, recomment, sort = 'popular' } = {}) {
        const sortInfo = {
            popular: 'get_entry_by_rank',
            newest: 'get_entry_by_timeline',
            comment: 'get_entry_by_comment',
            default: 'get_entry_by_rank'
        }

        const url = sortInfo[sort] || sortInfo.default

        return this.get(`${hostConfig.timeline}/${url}`, {
            params: {
                src: 'web',
                limit,
                category,
                before,
                recomment
            }
        })
    },

    // 获取文章详情
    // type = entry 获取概要、详情，文章内容只有缩略部分
    // type = entryView 获取完整的文章内容
    getPostDetail(postId, type) {
        return this.get(`${hostConfig.post}/getDetailData`, {
            params: {
                src: 'web',
                postId,
                type
            }
        })
    },

    // 获取文章评论
    getPostComment({ postId, createdAt, rankType = 'new', pageSize = 20 } = {}) {
        return this.get(`${hostConfig.comment}/comments/entry/${postId}`, {
            params: {
                createdAt,
                rankType,
                pageSize
            },
            headers: {
                'X-Juejin-Src': 'web'
            }
        })
    },

    // 根据tag获取文章的推荐文章
    getRecommendEntryByTagIds(tagIds, before) {
        return this.get(`${hostConfig.post}/getRecommendEntryByTagIds`, {
            params: {
                src: 'web',
                tagIds,
                before
            }
        })
    },

    // 点赞文章
    entryUserLike({ postId, clientId, token, uid }) {
        return this.put(`${hostConfig.like}/user/like/entry/${postId}`, null, {
            headers: {
                'X-Juejin-Src': 'web',
                'X-Juejin-Client': clientId,
                'X-Juejin-Token': token,
                'X-Juejin-Uid': uid
            }
        })
    },

    // 取消点赞文章
    cancelEntryUserLike({ postId, clientId, token, uid }) {
        return this.delete(`${hostConfig.like}/user/like/entry/${postId}`, {
            headers: {
                'X-Juejin-Src': 'web',
                'X-Juejin-Client': clientId,
                'X-Juejin-Token': token,
                'X-Juejin-Uid': uid
            }
        })
    },

    // 获取是否点赞文章
    getEntryUserLike({ postId, clientId, token, uid }) {
        return this.get(`${hostConfig.like}/user/like/entry/${postId}`, {
            headers: {
                'X-Juejin-Src': 'web',
                'X-Juejin-Client': clientId,
                'X-Juejin-Token': token,
                'X-Juejin-Uid': uid
            }
        })
    },

    // 获取文章分类
    getCategories() {
        return this.get(`${hostConfig.gold}/categories`, {
            headers: {
                'X-Juejin-Src': 'web'
            }
        })
    },

    // 点赞评论
    commentLike({ commentId, postId, targetType = 'entry', clientId, token, uid }) {
        const data = {
            targetId: postId,
            targetType
        }

        return this.put(`${hostConfig.comment}/comment/${commentId}/like`, data, {
            headers: {
                'X-Juejin-Src': 'web',
                'X-Juejin-Client': clientId,
                'X-Juejin-Token': token,
                'X-Juejin-Uid': uid
            }
        })
    },

    // 取消点赞评论
    cancelCommentLike({ commentId, postId, targetType = 'entry', clientId, token, uid }) {
        return this.delete(`${hostConfig.comment}/comment/${commentId}/like`, {
            params: {
                targetId: postId,
                targetType
            },
            headers: {
                'X-Juejin-Src': 'web',
                'X-Juejin-Client': clientId,
                'X-Juejin-Token': token,
                'X-Juejin-Uid': uid
            }
        })
    },

    // 获取用户专栏
    getEntryByUser({ targetUid, before, type = 'post', limit = 20, order = 'createdAt' } = {}) {
        return this.get(`${hostConfig.timeline}/get_entry_by_self`, {
            params: {
                src: 'web',
                order,
                limit,
                type,
                targetUid,
                before
            }
        })
    },

    // 获取用户赞的文章
    getUserLikeEntry(targetUid, page, pageSize = 20) {
        return this.get(`${hostConfig.like}/user/${targetUid}/like/entry`, {
            params: {
                page,
                pageSize
            },
            headers: {
                'X-Juejin-Src': 'web'
            }
        })
    }
}
