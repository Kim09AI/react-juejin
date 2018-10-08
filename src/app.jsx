import React from 'react'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ToastContainer, Flip } from 'react-toastify'
import ProgressBar from './components/progressBar'
import Header from './components/header'
import AuthPopup from './components/authPopup'

import 'react-toastify/dist/ReactToastify.css'

const mapState = state => ({
    isLogin: state.user.isLogin
})

@connect(mapState)
export default class App extends React.Component {
    static propTypes = {
        route: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        isLogin: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props)
        const whiteList = ['/books'] // 不显示header的白名单
        const showHeader = !this.isMatch(whiteList, props.location.pathname)
        this.state = {
            showHeader,
            whiteList
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            if (this.isMatch(this.state.whiteList, nextProps.location.pathname)) {
                this.setState({
                    showHeader: false
                })
            } else if (this.state.showHeader === false) {
                this.setState({
                    showHeader: true
                })
            }
        }
    }

    // 判断pathname是否以特定字符开头
    isMatch(whiteList, pathname) {
        return whiteList.some(_pathname => pathname.startsWith(_pathname))
    }

    render() {
        const { route, isLogin } = this.props
        const { showHeader } = this.state

        return (
            <div>
                <Helmet>
                    <title>掘金 - juejin.im - 一个帮助开发者成长的社区</title>
                </Helmet>
                <ProgressBar />
                <ToastContainer
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
                    style={{ textAlign: 'center' }}
                />
                {showHeader ? <Header boundaryTop={800} /> : null}
                {renderRoutes(route.routes)}
                {!isLogin && <AuthPopup />}
            </div>
        )
    }
}
