import Loadable from 'react-loadable'
// import { deferredAsyncConnect } from '../utils/deferredAsyncConnect'

const Loading = () => null

const Home = Loadable({
    loader: () => import(/* webpackChunkName: 'page-home' */ '../containers/home'),
    loading: Loading
})

export default {
    Home
}
