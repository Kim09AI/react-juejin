import Loadable from 'react-loadable'
import { deferredAsyncConnect } from '../utils/deferredAsyncConnect'
import { queryParse } from '../utils'

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

const Post = Loadable({
    loader: () => import(/* webpackChunkName: 'page-post' */ '../containers/post'),
    loading: Loading
})

const Setting = Loadable({
    loader: () => import(/* webpackChunkName: 'page-setting' */ '../containers/setting'),
    loading: Loading
})

const User = Loadable({
    loader: () => import(/* webpackChunkName: 'page-user' */ '../containers/user'),
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
    Post: deferredAsyncConnect(Post)({
        promise: ({ store, match: { params } }) => store.dispatch.post.getDetail(params.postId)
    }),
    Setting,
    User: deferredAsyncConnect(User)({
        promise: ({ store, match: { params } }) => store.dispatch.user.getOtherUserDetail({ userId: params.id })
    })
}
