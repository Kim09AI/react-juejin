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
