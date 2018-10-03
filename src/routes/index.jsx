import React from 'react'
import App from '../app'
import routerComponents from './routerComponents'

const routes = [{
    component: App,
    routes: [
        {
            path: '/',
            exact: true,
            component: routerComponents.Home
        },
        {
            path: '*',
            component: () => <div>404 Not Found</div>
        }
    ]
}]

export default routes
