import produce from 'immer'

export const userTags = {
    state: {
        tagList: []
    },
    reducers: {
        setTagList(state, { tagList }) {
            return {
                ...state,
                tagList
            }
        },
        updateSubscribe: produce((state, { index, isSubscribe }) => {
            const item = state.tagList[index]
            item.isSubscribe = isSubscribe
        })
    },
    effects: {
        async getUserSubscribeTags({ targetUid }, { api, user: { uid, token, clientId } }) {
            try {
                const { data } = await api.getSubscribeTags({
                    targetUid,
                    uid,
                    token,
                    clientId
                })

                this.setTagList({
                    tagList: data.d.tagList
                })
            } catch (err) {
                console.log(err)
            }
        },
        async toggleSubscribe({ tagId, isSubscribe, index }, { api, user: { uid, clientId, token } }) {
            try {
                const { data } = await api[isSubscribe ? 'subscribeTags' : 'unSubscribeTags']({
                    tagId,
                    uid,
                    token,
                    clientId
                })

                if (data.m === 'success') {
                    this.updateSubscribe({
                        index,
                        isSubscribe
                    })
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}
