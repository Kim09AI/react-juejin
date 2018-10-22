export const userPins = {
    state: {
        pinList: [],
        hasMore: true,
        prevTargetUid: ''
    },
    reducers: {
        setPinList(state, { pinList, more, prevTargetUid }) {
            return {
                ...state,
                prevTargetUid,
                hasMore: !!pinList.length,
                pinList: more
                    ? state.pinList.concat(pinList)
                    : pinList
            }
        }
    },
    effects: {
        async getUserPinList({ targetUid, before, more } = {}, { api, user, userPins }) {
            if (!more && userPins.prevTargetUid === targetUid && userPins.pinList.length > 0) {
                return
            }

            if (more && !userPins.hasMore) {
                return
            }

            try {
                const { data } = await api.getUserPinList(user.uid, targetUid, before)

                this.setPinList({
                    pinList: data.d.list,
                    prevTargetUid: targetUid,
                    more
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
