import { uniqBy } from 'lodash-es'

export const activities = {
    state: {
        activitieList: [],
        prevTargetUid: '', // 上次获取动态时的targetUid
        hasMore: true
    },
    reducers: {
        setActivitieList(state, { activitieList, more, prevTargetUid }) {
            return {
                ...state,
                hasMore: !!activitieList.length,
                prevTargetUid,
                activitieList: more
                    ? uniqBy(state.activitieList.concat(activitieList), item => item.objectId)
                    : activitieList
            }
        }
    },
    effects: {
        async getUserActivities({ targetUid, more, before }, { api, activities: { prevTargetUid, activitieList, hasMore } }) {
            if (!more && targetUid === prevTargetUid && activitieList.length > 0) {
                return
            }

            if (more && !hasMore) {
                return
            }

            try {
                const { data } = await api.getUserLog(targetUid, before)

                this.setActivitieList({
                    activitieList: data.d,
                    more,
                    prevTargetUid: targetUid
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
