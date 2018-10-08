import Loadable from 'react-loadable'
import { deferredAsyncConnect } from '../utils/deferredAsyncConnect'

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
    loader: () => import(/* webpackChunkName: 'page-books' */ '../containers/repos'),
    loading: Loading
})

const Pins = Loadable({
    loader: () => import(/* webpackChunkName: 'page-books' */ '../containers/pins'),
    loading: Loading
})

const Post = Loadable({
    loader: () => import(/* webpackChunkName: 'page-books' */ '../containers/post'),
    loading: Loading
})

export default {
    Home: deferredAsyncConnect(Home)({
        promise: ({ store }) => store.dispatch.home.getEntryList()
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
    })
}
