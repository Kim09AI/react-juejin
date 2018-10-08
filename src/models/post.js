import { uniqBy } from 'lodash-es'

export const post = {
    state: {
        info: {},
        content: {},
        commentList: [],
        commentCount: 0,
        recommendEntry: []
    },
    reducers: {
        setDetail(state, { info, content }) {
            return {
                ...state,
                info,
                content
            }
        },
        setComment(state, { commentList, more, commentCount }) {
            return {
                ...state,
                commentList: more ? state.commentList.concat(commentList) : commentList,
                commentCount
            }
        },
        setRecommendEntry(state, { recommendEntry, more }) {
            return {
                ...state,
                recommendEntry: more ? uniqBy(state.recommendEntry.concat(recommendEntry), item => item.objectId) : recommendEntry
            }
        }
    },
    effects: {
        async getDetail(postId, { api }) {
            try {
                const [{ data: infoData }, { data: contentData }] = await Promise.all([
                    api.getPostDetail(postId, 'entry'),
                    api.getPostDetail(postId, 'entryView')
                ])

                // 保存文章详情，没有数据时设置为默认值
                this.setDetail({
                    info: Object.keys(infoData.d).length > 0 ? infoData.d : {},
                    content: Object.keys(contentData.d).length > 0 ? contentData.d : {}
                })

                await this.getComment({ pageSize: 6, postId: infoData.d.objectId })
            } catch (err) {
                console.log(err)
            }
        },
        async getComment({ postId, createdAt, rankType, pageSize, more } = {}, { api, post: { commentList, commentCount } }) {
            if (commentList.length > 0 && commentList.length >= commentCount) {
                return
            }

            try {
                const { data } = await api.getPostComment({ postId, createdAt, rankType, pageSize })
                this.setComment({ commentList: data.d.comments, commentCount: data.d.count, more })
            } catch (err) {
                console.log(err)
            }
        },
        async getRecommendEntryByTagIds({ tagIds, before }, { api, post: { recommendEntry } }) {
            try {
                const { data } = await api.getRecommendEntryByTagIds(tagIds, before)

                this.setRecommendEntry({
                    more: !!before && !!recommendEntry.length,
                    recommendEntry: data.d.entrylist
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
