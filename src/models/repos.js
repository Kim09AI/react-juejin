export const repos = {
    state: {
        repoList: [],
        total: 0
    },
    reducers: {
        setRepoList(state, { repoList, more, total }) {
            return {
                ...state,
                repoList: more ? state.repoList.concat(repoList) : repoList,
                total
            }
        }
    },
    effects: {
        async getRepoList({ more, before } = {}, { api, repos: { repoList, total } }) {
            if (repoList.length !== 0 && repoList.length >= total) {
                return
            }

            try {
                const { data } = await api.getCustomRepos(before)
                this.setRepoList({ repoList: data.d.repoList, total: data.d.total, more })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
