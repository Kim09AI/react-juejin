export const events = {
    state: {
        eventList: []
    },
    reducers: {
        setEventList(state, { eventList }) {
            return {
                ...state,
                eventList
            }
        }
    },
    effects: {
        async getEventList({ pageNum }, { api }) {
            try {
                const { data } = await api.getEventList({ pageNum })

                this.setEventList({
                    eventList: data.d
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
