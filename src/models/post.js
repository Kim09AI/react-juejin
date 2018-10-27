import { uniqBy } from 'lodash-es'
import produce from 'immer'

export const post = {
    state: {
        postId: '',
        tagIds: '',
        info: {}, // 文章详细信息
        content: {}, // 文章全文等
        commentList: [],
        commentCount: 0,
        recommendEntry: []
    },
    reducers: {
        setDetail(state, { info, content, postId }) {
            return {
                ...state,
                info,
                content,
                postId
            }
        },
        setComment(state, { commentList, more, commentCount }) {
            return {
                ...state,
                commentList: more ? state.commentList.concat(commentList) : commentList,
                commentCount
            }
        },
        setRecommendEntry(state, { recommendEntry, more, tagIds }) {
            return {
                ...state,
                recommendEntry: more ? uniqBy(state.recommendEntry.concat(recommendEntry), item => item.objectId) : recommendEntry,
                tagIds
            }
        },
        updatePostLike: produce((state, { isApprove }) => {
            state.info.collectionCount += isApprove ? 1 : -1
            state.info.isCollected = isApprove ? true : false
        }),
        initIsCollected: produce((state, { isCollected }) => {
            state.info.isCollected = isCollected
        }),
        updateRecommendEntryLike: produce((state, { index, isApprove }) => {
            const post = state.recommendEntry[index]
            post.isCollected = isApprove ? true : false
            post.collectionCount += isApprove ? 1 : -1
        }),
        updateCommentLike: produce((state, { index, isLike }) => {
            const comment = state.commentList[index]
            comment.isLike = isLike
            comment.likesCount += isLike ? 1 : -1
        })
    },
    effects: {
        async getDetail(postId, { api, post }) {
            if (postId === post.postId && Object.keys(post.info).length > 0) {
                return
            }

            try {
                const [{ data: infoData }, { data: contentData }] = await Promise.all([
                    api.getPostDetail(postId, 'entry'),
                    api.getPostDetail(postId, 'entryView')
                ])

                // 保存文章详情，没有数据时设置为默认值
                this.setDetail({
                    info: Object.keys(infoData.d).length > 0 ? infoData.d : {},
                    content: Object.keys(contentData.d).length > 0 ? contentData.d : {},
                    postId
                })

                await this.getComment({ pageSize: 6, postId: infoData.d.objectId })
            } catch (err) {
                // 可能不是掘金站内文章
                this.setDetail({
                    info: {},
                    content: {},
                    postId
                })

                this.setComment({
                    commentList: [],
                    commentCount: 0,
                    more: false
                })
            }
        },
        async getComment({ postId, createdAt, rankType, pageSize, more } = {}, { api, post: { commentList, commentCount } }) {
            if (more && commentList.length >= commentCount) {
                return
            }

            try {
                const { data } = await api.getPostComment({ postId, createdAt, rankType, pageSize })

                this.setComment({
                    commentList: data.d.comments,
                    commentCount: data.d.count,
                    more
                })
            } catch (err) {
                console.log(err)
            }
        },
        async getRecommendEntryByTagIds({ tagIds, before }, { api, post }) {
            // 如果tagIds和上次的一样，before不为空且recommendEntry不是空数组，说明是获取下一页
            const more = tagIds === post.tagIds && !!before && !!post.recommendEntry.length

            // 不是获取下一页并且tagIds和上次获取的tagIds相等
            if (!more && tagIds === post.tagIds) {
                return
            }

            try {
                const { data } = await api.getRecommendEntryByTagIds(tagIds, before)

                this.setRecommendEntry({
                    more,
                    recommendEntry: data.d.entrylist,
                    tagIds
                })
            } catch (err) {
                console.log(err)
            }
        },
        async togglePostLike({ postId, isApprove }, { api, user: { token, clientId, uid } }) {
            try {
                const { data } = await api[isApprove ? 'entryUserLike' : 'cancelEntryUserLike']({ postId, token, clientId, uid })

                if (data.m === 'success') {
                    this.updatePostLike({ isApprove })
                }
            } catch (err) {
                console.log(err)
            }
        },
        async checkPostLike({ postId }, { api, user: { token, clientId, uid, isLogin } }) {
            if (!isLogin) {
                return
            }

            try {
                const { data } = await api.getEntryUserLike({ postId, token, clientId, uid })
                this.initIsCollected({ isCollected: data.d.like })
            } catch (err) {
                console.log(err)
            }
        },
        async toggleRecommendEntryLike({ postId, index, isApprove }, { api, user: { token, clientId, uid } }) {
            try {
                const { data } = await api[isApprove ? 'entryUserLike' : 'cancelEntryUserLike']({ postId, token, clientId, uid })

                if (data.m === 'success') {
                    this.updateRecommendEntryLike({ index, isApprove })
                }
            } catch (err) {
                console.log(err)
            }
        },
        async toggleCommentLike({ commentId, postId, targetType, isLike, index }, { api, user: { token, clientId, uid } }) {
            try {
                const { data } = await api[isLike ? 'commentLike' : 'cancelCommentLike']({
                    commentId,
                    postId,
                    targetType,
                    token,
                    clientId,
                    uid
                })

                if (data.m === 'success') {
                    this.updateCommentLike({ isLike, index })
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}
