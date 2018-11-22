import 'regenerator-runtime/runtime'
import React from 'react'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ReduxAsyncConnect } from 'redux-connect'
import { ChunkExtractorManager } from '@loadable/server'
import createStore from './store'
import routes from './routes'
import { createSSRApi } from './api'

export default (url, routerContext, store, helpers, extractor) => (
    <ChunkExtractorManager extractor={extractor}>
        <Provider store={store}>
            <Router location={url} context={routerContext}>
                <ReduxAsyncConnect routes={routes} helpers={helpers} />
            </Router>
        </Provider>
    </ChunkExtractorManager>
)

export { createStore, routes, createSSRApi }
