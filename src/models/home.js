import { uniqBy } from 'lodash-es'

export const home = {
    state: {
        entryList: []
    },
    reducers: {
        setEntryList(state, { entryList, more }) {
            return {
                ...state,
                entryList: more === true
                    ? uniqBy(state.entryList.concat(entryList), item => item.objectId)
                    : entryList
            }
        }
    },
    effects: {
        async getEntryList(payload = {}, { api }) {
            try {
                const { data } = await api.getEntryByRank(payload)

                if (data.d.entrylist && data.d.entrylist.length > 0) {
                    this.setEntryList({ entryList: data.d.entrylist, more: payload.more })
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}
