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
            path: '/books',
            exact: true,
            component: routerComponents.Books,
            key: 'books'
        },
        {
            path: '/books/:alias',
            component: routerComponents.Books,
            key: 'books'
        },
        {
            path: '/repos',
            component: routerComponents.Repos
        },
        {
            path: '/pins',
            component: routerComponents.Pins
        },
        {
            path: '/post/:postId',
            component: routerComponents.Post
        },
        {
            path: '*',
            component: () => <div>404 Not Found</div>
        }
    ]
}]

export default routes
