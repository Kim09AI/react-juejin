import 'regenerator-runtime/runtime'
import React from 'react'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'
import { ReduxAsyncConnect } from 'redux-connect'
import createStore from './store'
import routes from './routes'
import { createSSRApi } from './api'

export default (url, routerContext, store, modules, helpers) => (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Provider store={store}>
            <Router location={url} context={routerContext}>
                <ReduxAsyncConnect routes={routes} helpers={helpers} />
            </Router>
        </Provider>
    </Loadable.Capture>
)

export { createStore, routes, createSSRApi }
