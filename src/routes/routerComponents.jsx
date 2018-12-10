import loadable from '../components/loadable'
import { deferredAsyncConnect } from '../utils/deferredAsyncConnect'
import { queryParse } from '../utils'

import NotMatch from '../containers/notMatch'

const Home = loadable(() => import(/* webpackChunkName: 'page-home' */ '../containers/home'))
const Books = loadable(() => import(/* webpackChunkName: 'page-books' */ '../containers/books'))
const Repos = loadable(() => import(/* webpackChunkName: 'page-repos' */ '../containers/repos'))
const Pins = loadable(() => import(/* webpackChunkName: 'page-pins' */ '../containers/pins'))
const Events = loadable(() => import(/* webpackChunkName: 'page-events' */ '../containers/events'))
const Post = loadable(() => import(/* webpackChunkName: 'page-post' */ '../containers/post'))
const User = loadable(() => import(/* webpackChunkName: 'page-user' */ '../containers/user'))
const Activities = loadable(() => import(/* webpackChunkName: 'page-activities' */ '../containers/activities'))
const UserPosts = loadable(() => import(/* webpackChunkName: 'page-userPosts' */ '../containers/userPosts'))
const UserPins = loadable(() => import(/* webpackChunkName: 'page-userPins' */ '../containers/userPins'))
const UserLikes = loadable(() => import(/* webpackChunkName: 'page-userLikes' */ '../containers/userLikes'))
const UserTags = loadable(() => import(/* webpackChunkName: 'page-userTags' */ '../containers/userTags'))

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
