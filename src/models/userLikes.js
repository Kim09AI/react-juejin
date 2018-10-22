import produce from 'immer'

export const userLikes = {
    state: {
        entryList: [],
        total: 0,
        pageNum: 0,
        prevTargetUid: ''
    },
    reducers: {
        setUserLikeEntry(state, { entryList, more, total, pageNum, prevTargetUid }) {
            return {
                ...state,
                total,
                prevTargetUid,
                pageNum: pageNum + 1,
                entryList: more
                    ? state.entryList.concat(entryList)
                    : entryList
            }
        },
        updateEntryLike: produce((state, { index, isApprove }) => {
            const item = state.entryList[index]
            item.isCollected = isApprove ? true : false
            item.collectionCount += isApprove ? 1 : -1
        })
    },
    effects: {
        async getUserLikeEntry({ targetUid, more } = {}, { api, userLikes }) {
            const { prevTargetUid, entryList, total, pageNum } = userLikes

            if (!more && targetUid === prevTargetUid && entryList.length > 0) {
                return
            }

            if (more && entryList.length >= total) {
                return
            }

            const _pageNum = more ? pageNum : 0

            try {
                const { data } = await api.getUserLikeEntry(targetUid, _pageNum)

                this.setUserLikeEntry({
                    entryList: data.d.entryList,
                    total: data.d.total,
                    more,
                    pageNum: _pageNum,
                    prevTargetUid: targetUid
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
        }
    }
}
