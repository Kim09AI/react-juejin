import { uniqBy, last } from 'lodash-es'
import produce from 'immer'

export const home = {
    state: {
        entryList: [],
        categoryList: [],
        category: '',
        sort: ''
    },
    reducers: {
        setEntryList(state, { entryList, more, category, sort }) {
            return {
                ...state,
                category,
                sort,
                entryList: more === true
                    ? uniqBy(state.entryList.concat(entryList), item => item.objectId)
                    : entryList
            }
        },
        updateEntryLike: produce((state, { index, isApprove }) => {
            const item = state.entryList[index]
            item.isCollected = isApprove ? true : false
            item.collectionCount += isApprove ? 1 : -1
        }),
        setCategorieList(state, { categoryList }) {
            return {
                ...state,
                categoryList
            }
        },
        resetEntryList(state, { category, sort }) {
            if (state.category !== category || state.sort !== sort) {
                return {
                    ...state,
                    entryList: []
                }
            }

            return state
        }
    },
    effects: {
        async getEntryList({ limit, category, more, sort } = {}, { api, user: { isLogin }, home }) {
            // 不是获取下一页，并且获取相同类型和排序的文章时
            if (!more && category === home.category && sort === home.sort) {
                return
            }

            let before
            const sortInfo = {
                popular: 'rankIndex',
                newest: 'verifyCreatedAt',
                comment: 'lastCommentTime',
                default: 'rankIndex'
            }

            // 根据排序类别拿到获取下一页数据的before
            if (more === true && home.entryList.length > 0) {
                const lastEntry = last(home.entryList)
                const beforeProp = sortInfo[sort] || sortInfo.default
                before = lastEntry[beforeProp]
            }

            try {
                const { data } = await api.getEntry({
                    limit,
                    category,
                    before,
                    recomment: isLogin && category === 'all' ? 1 : undefined,
                    sort: isLogin ? sort : undefined
                })

                this.setEntryList({
                    entryList: data.d.entrylist,
                    more,
                    category,
                    sort
                })
            } catch (err) {
                console.log(err)
            }
        },
        async toggleEntryLike({ postId, index, isApprove }, { api, user: { token, clientId, uid } }) {
            try {
                const { data } = await api[isApprove ? 'entryUserLike' : 'cancelEntryUserLike']({ postId, token, clientId, uid })

                if (data.m === 'success') {
                    this.updateEntryLike({ index, isApprove })
                }
            } catch (err) {
                console.log(err)
            }
        },
        async getCategorieList(payload, { api, user: { isLogin }, home }) {
            if (!isLogin || home.categoryList.length > 0) {
                return
            }

            try {
                const { data } = await api.getCategories()
                const extraCategortList = [{
                    id: 'all',
                    name: '我关注的',
                    title: 'subscribe'
                }]

                this.setCategorieList({
                    categoryList: extraCategortList.concat(data.d.categoryList)
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
