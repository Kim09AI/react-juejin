import { unionBy } from 'lodash-es'
import produce from 'immer'

export const userPosts = {
    state: {
        entryList: [],
        hasMore: true,
        prevTargetUid: ''
    },
    reducers: {
        setUserPosts(state, { entryList, more, prevTargetUid }) {
            return {
                ...state,
                prevTargetUid,
                hasMore: !!entryList.length,
                entryList: more
                    ? unionBy(state.entryList.concat(entryList), item => item.objectId)
                    : entryList
            }
        },
        updateUserPostLike: produce((state, { index, isApprove }) => {
            const item = state.entryList[index]
            item.isCollected = isApprove ? true : false
            item.collectionCount += isApprove ? 1 : -1
        })
    },
    effects: {
        async getUserPosts({ targetUid, before, more } = {}, { api, userPosts: { hasMore, prevTargetUid, entryList } }) {
            if (!more && prevTargetUid === targetUid && entryList.length > 0) {
                return
            }

            if (more && !hasMore) {
                return
            }

            try {
                const { data } = await api.getEntryByUser({ targetUid, before })

                this.setUserPosts({
                    more,
                    entryList: data.d.entrylist,
                    prevTargetUid: targetUid
                })
            } catch (err) {
                console.log(err)
            }
        },
        async toggleUserPostLike({ postId, index, isApprove }, { api, user: { token, clientId, uid } }) {
            try {
                const { data } = await api[isApprove ? 'entryUserLike' : 'cancelEntryUserLike']({ postId, token, clientId, uid })

                if (data.m === 'success') {
                    this.updateUserPostLike({ index, isApprove })
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}
