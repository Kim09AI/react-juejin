export const pins = {
    state: {
        total: 0,
        pinList: []
    },
    reducers: {
        setPinList(state, { pinList, more, total }) {
            return {
                ...state,
                pinList: more === true ? state.pinList.concat(pinList) : pinList,
                total
            }
        }
    },
    effects: {
        async getPinList({ before, more } = {}, { api, pins: { total, pinList } }) {
            if (pinList.length !== 0 && pinList.length >= total) {
                return
            }

            try {
                const { data } = await api.getPinList(before)
                this.setPinList({ pinList: data.d.list, total: data.d.total, more })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
