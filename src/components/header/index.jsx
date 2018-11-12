import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ScrollAndTranslate from '../scrollAndTranslate'
import UserMenu from '../userMenu'
import './style.styl'

const mapState = state => ({
    isLogin: state.user.isLogin,
    userDetail: state.user.userDetail
})

const mapDispatch = ({ authPopup: { showAuthPopup }, user: { logout } }) => ({
    showAuthPopup,
    logout
})

@withRouter
@connect(mapState, mapDispatch)
@ScrollAndTranslate
export default class Header extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired, // eslint-disable-line
        showAuthPopup: PropTypes.func.isRequired,
        translateTo: PropTypes.bool.isRequired,
        isLogin: PropTypes.bool.isRequired,
        userDetail: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        const navList = [
            { text: '首页', path: '/' },
            { text: '沸点', path: '/pins' },
            { text: '小册', path: '/books' },
            { text: '开源库', path: '/repos' },
            { text: '活动', path: '/events' }
        ]
        this.state = {
            navList,
            currentIndex: -1,
            showNavList: false,
            pathname: ''
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.hideNavList)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const nextPathname = nextProps.location.pathname
        if (nextPathname !== prevState.pathname) {
            const currentIndex = prevState.navList.findIndex(item => item.path === nextPathname)
            return {
                currentIndex,
                pathname: nextPathname
            }
        }

        return null
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.hideNavList)
    }

    toggleNavList = () => {
        this.setState(prevState => ({
            showNavList: !prevState.showNavList
        }))
    }

    hideNavList = (e) => {
        if (this.nav === e.target || $.contains(this.nav, e.target)) {
            return
        }

        if (this.state.showNavList) {
            this.setState({
                showNavList: false
            })
        }
    }

    render() {
        const { navList, currentIndex, showNavList } = this.state
        const { showAuthPopup, translateTo, isLogin, userDetail, logout } = this.props

        return (
            <div styleName="header-wrapper">
                <div styleName={classNames({ 'header-content': true, hide: translateTo })}>
                    <div styleName="header-nav">
                        <Link to="/">
                            <img src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt="juejin" />
                        </Link>
                        <div styleName="nav-wrapper" onClick={this.toggleNavList} ref={nav => { this.nav = nav }}>
                            <span styleName="nav-current">{navList[currentIndex] ? navList[currentIndex].text : '首页'}</span>
                            <i className="iconfont" styleName="arrow">&#xe6aa;</i>
                            <ul styleName={classNames({ 'nav-list': true, show: showNavList })}>
                                {
                                    navList.map((nav, index) => (
                                        <li key={nav.text} styleName="item">
                                            <Link
                                                to={nav.path}
                                                styleName={classNames({ link: true, active: currentIndex === index })}
                                            >
                                                {nav.text}
                                            </Link>
                                        </li>
                                    ))
                                }
                                <li styleName="other-item">
                                    <a href="https://conf.juejin.im/2018/mini-programs">
                                        <img
                                            styleName="mini-programs"
                                            src="https://b-gold-cdn.xitu.io/v3/static/img/conf.78960f5.gif"
                                            alt="掘金开发者大会 · 微信小程序专场"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {
                        isLogin
                            ? (
                                <div styleName="header-auth">
                                    <div styleName="notify-wrapper">
                                        <i className="iconfont" styleName="notify">&#xe6eb;</i>
                                    </div>
                                    <UserMenu uid={userDetail.uid} logout={logout} />
                                </div>
                            )
                            : (
                                <div styleName="header-auth">
                                    <span styleName="login-btn" onClick={() => showAuthPopup('login')}>登录</span>
                                    <span styleName="circle">·</span>
                                    <span styleName="register-btn" onClick={() => showAuthPopup('register')}>注册</span>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}
