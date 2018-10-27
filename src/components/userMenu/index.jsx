import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.styl'

export default class UserMenu extends React.PureComponent {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired
    }

    state = {
        show: false
    }

    componentDidMount() {
        document.addEventListener('click', this.hideMenu)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.hideMenu)
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            show: !prevState.show
        }))
    }

    hideMenu = (e) => {
        if (e.target === this.menu || $.contains(this.menu, e.target)) {
            return
        }

        if (this.state.show) {
            this.setState({
                show: false
            })
        }
    }

    render() {
        const { uid, logout } = this.props
        const { show } = this.state

        return (
            <div styleName="user-menu" onClick={this.toggleMenu} ref={menu => { this.menu = menu }}>
                <div styleName="avatar" />
                <ul styleName={classNames({ 'menu-list': true, active: show })} onClick={this.hideMenu}>
                    <div styleName="item-group">
                        <li>
                            <Link to={`/user/${uid}`} styleName="item">
                                <i className="iconfont">&#xe60a;</i>
                                <span styleName="menu-text">我的主页</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={`/user/${uid}/likes`} styleName="item">
                                <i className="iconfont">&#xe630;</i>
                                <span styleName="menu-text">我赞过的</span>
                            </Link>
                        </li>
                        <li styleName="item">
                            <i className="iconfont" styleName="collect">&#xe632;</i>
                            <span styleName="menu-text">我的收藏集</span>
                        </li>
                        <li styleName="item">
                            <i className="iconfont" styleName="shop">&#xe68d;</i>
                            <span styleName="menu-text">已购</span>
                        </li>
                        <li>
                            <Link to="/subscribe" styleName="item">
                                <i className="iconfont" styleName="tag">&#xe661;</i>
                                <span styleName="menu-text">标签管理</span>
                            </Link>
                        </li>
                    </div>
                    <div styleName="item-group">
                        <li styleName="item">
                            <i className="iconfont" styleName="setting">&#xe609;</i>
                            <span styleName="menu-text">设置</span>
                        </li>
                        <li styleName="item">
                            <i className="iconfont">&#xe61e;</i>
                            <span styleName="menu-text">关于</span>
                        </li>
                    </div>
                    <div styleName="item-group">
                        <li styleName="item" onClick={logout}>
                            <i className="iconfont">&#xe638;</i>
                            <span styleName="menu-text">登出</span>
                        </li>
                    </div>
                </ul>
            </div>
        )
    }
}
