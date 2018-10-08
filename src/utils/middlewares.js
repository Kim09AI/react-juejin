export const progressBarMiddleware = ({ getState, dispatch }) => next => action => {
    const { start } = getState().progressBar

    if (action.type === '@redux-conn/BEGIN_GLOBAL_LOAD') {
        start === true
            ? dispatch({ type: 'progressBar/restart' })
            : dispatch({ type: 'progressBar/start' })
    }

    if (action.type === '@redux-conn/END_GLOBAL_LOAD') {
        dispatch({ type: 'progressBar/finish' })
    }

    return next(action)
}

// 对需要登录的用户操作进行拦截
export const authrizedMiddleware = ({ getState, dispatch }) => next => action => {
    const { payload } = action
    const { isLogin } = getState().user.isLogin

    if (payload && payload.auth === true && isLogin === false) {
        return dispatch({ type: 'authPopup/showAuthPopup' })
    }

    return next(action)
}
