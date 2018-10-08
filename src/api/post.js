export default hostConfig => ({
    // 获取热门文章
    getEntryByRank({ limit = 20, category = 'all', before } = {}) {
        return this.get(`${hostConfig.timeline}/get_entry_by_rank`, {
            params: {
                src: 'web',
                limit,
                category,
                before
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
                'X-Juejin-Src': 'web',
                'X-Juejin-Client': '',
                'X-Juejin-Token': '',
                'X-Juejin-Uid': '',
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
    }
})
