import React from 'react'
import { Redirect } from 'react-router-dom'
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
            path: '/events',
            component: routerComponents.Events
        },
        {
            path: '/post/:postId',
            component: routerComponents.Post
        },
        {
            path: '/user/:id',
            component: routerComponents.User,
            routes: [
                {
                    path: '/user/:id',
                    component: routerComponents.Activities,
                    exact: true,
                    key: 'activities'
                },
                {
                    path: '/user/:id/activities',
                    component: routerComponents.Activities,
                    key: 'activities'
                },
                {
                    path: '/user/:id/posts',
                    component: routerComponents.UserPosts
                },
                {
                    path: '/user/:id/pins',
                    component: routerComponents.UserPins
                },
                {
                    path: '/user/:id/likes',
                    component: routerComponents.UserLikes
                },
                {
                    path: '/user/:id/tags',
                    component: routerComponents.UserTags
                },
                {
                    path: '/user/:id/*',
                    // 原本只需要<Redirect to={`/user/${props.match.params.id}`} />即可
                    // 这样处理是因为搭配了redux-connect，路由是异步切换的
                    // 在切换完成之前props的变化会导致重复渲染本组件，即重复Redirect导致报错
                    // eslint-disable-next-line
                    component: (props) => props.history.location.pathname !== `/user/${props.match.params.id}` && <Redirect to={`/user/${props.match.params.id}`} />
                }
            ]
        },
        {
            path: '*',
            component: routerComponents.NotMatch
        }
    ]
}]

export default routes
