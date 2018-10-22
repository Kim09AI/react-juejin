import Loadable from 'react-loadable'
import { deferredAsyncConnect } from '../utils/deferredAsyncConnect'
import { queryParse } from '../utils'

import NotMatch from '../containers/notMatch'

const Loading = () => null

const Home = Loadable({
    loader: () => import(/* webpackChunkName: 'page-home' */ '../containers/home'),
    loading: Loading
})

const Books = Loadable({
    loader: () => import(/* webpackChunkName: 'page-books' */ '../containers/books'),
    loading: Loading
})

const Repos = Loadable({
    loader: () => import(/* webpackChunkName: 'page-repos' */ '../containers/repos'),
    loading: Loading
})

const Pins = Loadable({
    loader: () => import(/* webpackChunkName: 'page-pins' */ '../containers/pins'),
    loading: Loading
})

const Events = Loadable({
    loader: () => import(/* webpackChunkName: 'page-events' */ '../containers/events'),
    loading: Loading
})

const Post = Loadable({
    loader: () => import(/* webpackChunkName: 'page-post' */ '../containers/post'),
    loading: Loading
})

const User = Loadable({
    loader: () => import(/* webpackChunkName: 'page-user' */ '../containers/user'),
    loading: Loading
})

const Activities = Loadable({
    loader: () => import(/* webpackChunkName: 'page-activities' */ '../containers/activities'),
    loading: Loading
})

const UserPosts = Loadable({
    loader: () => import(/* webpackChunkName: 'page-userPosts' */ '../containers/userPosts'),
    loading: Loading
})

const UserPins = Loadable({
    loader: () => import(/* webpackChunkName: 'page-userPins' */ '../containers/userPins'),
    loading: Loading
})

const UserLikes = Loadable({
    loader: () => import(/* webpackChunkName: 'page-userLikes' */ '../containers/userLikes'),
    loading: Loading
})

const UserTags = Loadable({
    loader: () => import(/* webpackChunkName: 'page-userTags' */ '../containers/userTags'),
    loading: Loading
})

export default {
    Home: deferredAsyncConnect(Home)({
        promise: async ({ store, location: { search } }) => {
            await store.dispatch.home.getCategorieList()

            const { category: categoryValue, sort } = queryParse(search)
            const { categoryList } = store.getState().home

            // 获取校正后的category
            const matchedItem = categoryList.find(item => item.title === categoryValue) || {}
            const category = matchedItem.id || 'all'

            // 获取校正后的sort
            const sortType = ['popular', 'newest', 'comment']
            const _sort = sortType.indexOf(sort) > -1 ? sort : sortType[0]

            // 获取数据前先清空文章列表
            store.dispatch.home.resetEntryList({ category, sort: _sort })

            await store.dispatch.home.getEntryList({ category, sort: _sort })
        },
        deferred: true
    }),
    Books: deferredAsyncConnect(Books)({
        promise: ({ store, match: { params } }) => Promise.all([
            store.dispatch.books.getBookList({ alias: params.alias }),
            store.dispatch.books.getNavList()
        ])
    }),
    Repos: deferredAsyncConnect(Repos)({
        promise: ({ store }) => store.dispatch.repos.getRepoList()
    }),
    Pins: deferredAsyncConnect(Pins)({
        promise: ({ store }) => store.dispatch.pins.getPinList()
    }),
    Events: deferredAsyncConnect(Events)({
        promise: ({ store }) => store.dispatch.events.getEventList({ pageNum: 1 })
    }),
    Post: deferredAsyncConnect(Post)({
        promise: ({ store, match: { params } }) => store.dispatch.post.getDetail(params.postId)
    }),
    User: deferredAsyncConnect(User)({
        promise: ({ store, match: { params } }) => store.dispatch.user.getUserDetailById({ userId: params.id })
    }),
    Activities: deferredAsyncConnect(Activities)({
        promise: ({ store, match: { params } }) => store.dispatch.activities.getUserActivities({ targetUid: params.id })
    }),
    UserPosts: deferredAsyncConnect(UserPosts)({
        promise: ({ store, match: { params } }) => store.dispatch.userPosts.getUserPosts({ targetUid: params.id })
    }),
    UserPins: deferredAsyncConnect(UserPins)({
        promise: ({ store, match: { params } }) => store.dispatch.userPins.getUserPinList({ targetUid: params.id })
    }),
    UserLikes: deferredAsyncConnect(UserLikes)({
        promise: ({ store, match: { params } }) => store.dispatch.userLikes.getUserLikeEntry({ targetUid: params.id })
    }),
    UserTags: deferredAsyncConnect(UserTags)({
        promise: ({ store, match: { params } }) => store.dispatch.userTags.getUserSubscribeTags({ targetUid: params.id })
    }),
    NotMatch
}
