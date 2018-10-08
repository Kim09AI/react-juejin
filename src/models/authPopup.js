export const authPopup = {
    state: {
        popupState: false,
        type: 'login'
    },
    reducers: {
        showAuthPopup(state, type) {
            return {
                popupState: true,
                type: type || 'login'
            }
        },
        hideAuthPopup(state) {
            return {
                ...state,
                popupState: false
            }
        },
        toggleType(state) {
            return {
                ...state,
                type: state.type === 'login' ? 'register' : 'login'
            }
        }
    }
}
