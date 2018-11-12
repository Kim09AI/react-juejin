import React from 'react'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ToastContainer, Flip } from 'react-toastify'
import pureWrapper from './components/pureWrapper'
import ProgressBar from './components/progressBar'
import Header from './components/header'
import AuthPopup from './components/authPopup'
import ScrollRestoration from './components/scrollRestoration'
import ErrorBoundary from './components/errorBoundary'

import 'react-toastify/dist/ReactToastify.css'

const PureToastContainer = pureWrapper(ToastContainer)

function shouldShowHeader(whiteList, pathname) {
    return !whiteList.some(pattern => pattern.test(pathname))
}

const mapState = state => ({
    isLogin: state.user.isLogin
})

@connect(mapState)
export default class App extends React.Component {
    static propTypes = {
        route: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired, // eslint-disable-line
        isLogin: PropTypes.bool.isRequired
    }

    state = {
        showHeader: false,
        whiteList: [/^\/books/, /^\/user/, /^\/post\/\w+/], // 不显示header的白名单
        pathname: ''
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.location.pathname !== prevState.pathname) {
            const showHeader = shouldShowHeader(prevState.whiteList, nextProps.location.pathname)

            return {
                showHeader,
                pathname: nextProps.location.pathname
            }
        }

        return null
    }

    render() {
        const { route, isLogin } = this.props
        const { showHeader } = this.state

        return (
            <div>
                <Helmet>
                    <title>掘金 - juejin.im - 一个帮助开发者成长的社区</title>
                    <meta name="description" content="react-juejin - 高仿掘金服务端渲染项目" />
                </Helmet>
                <ProgressBar />
                <PureToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                    transition={Flip}
                    className="align-center"
                />
                {showHeader ? <Header boundaryTop={800} /> : null}
                {!isLogin && <AuthPopup />}
                <ScrollRestoration />
                <ErrorBoundary>
                    {renderRoutes(route.routes)}
                </ErrorBoundary>
            </div>
        )
    }
}
