export const progressBar = {
    state: {
        start: false,
        restart: 0,
        finish: false
    },
    reducers: {
        start(state) {
            return {
                ...state,
                start: true,
                finish: false
            }
        },
        finish(state) {
            return {
                ...state,
                start: false,
                finish: true
            }
        },
        restart(state) {
            return {
                ...state,
                restart: state.restart + 1
            }
        }
    }
}
