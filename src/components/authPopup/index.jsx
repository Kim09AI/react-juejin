import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import './style.styl'

const mapState = state => ({
    popupState: state.authPopup.popupState,
    type: state.authPopup.type
})

const mapDispatch = ({ authPopup: { hideAuthPopup, toggleType }, user: { loginByPhoneNumber } }) => ({
    hideAuthPopup,
    toggleType,
    loginByPhoneNumber
})

@connect(mapState, mapDispatch)
export default class AuthPopup extends React.Component {
    static propTypes = {
        popupState: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        hideAuthPopup: PropTypes.func.isRequired,
        toggleType: PropTypes.func.isRequired,
        loginByPhoneNumber: PropTypes.func.isRequired
    }

    state = {
        phone: '',
        password: '',
        username: ''
    }

    updateFiled = (e, field) => {
        this.setState({
            [field]: e.target.value
        })
    }

    check() {
        const phone = this.state.phone.trim()
        const password = this.state.password.trim()

        if (!phone) {
            return '手机号不能为空'
        }

        if (!/^1[358][01589]\d{8}/.test(phone)) {
            return '手机号码不正确'
        }

        if (!password) {
            return '密码不能为空'
        }

        if (password.length < 6) {
            return '密码长度不能小于6位'
        }

        return ''
    }

    login = () => {
        const text = this.check()

        if (text) {
            return toast.info(text)
        }

        const { phone, password } = this.state
        return this.props.loginByPhoneNumber({ phoneNumber: phone.trim(), password: password.trim() })
            .then(() => {
                this.props.hideAuthPopup()
            })
    }

    loginView() {
        const { popupState, hideAuthPopup, toggleType } = this.props
        const { phone, password } = this.state

        return (
            <div styleName={classNames({ content: true, active: popupState })}>
                <div styleName="header">
                    <h3 styleName="title">登录</h3>
                    <i className="iconfont" styleName="close" onClick={hideAuthPopup}>&#xe608;</i>
                </div>
                <div styleName="form">
                    <input type="text" placeholder="请输入手机号" styleName="input" value={phone} onChange={(e) => this.updateFiled(e, 'phone')} />
                    <input type="password" placeholder="请输入密码" styleName="input" value={password} onChange={(e) => this.updateFiled(e, 'password')} />
                    <span styleName="submit" onClick={this.login}>登录</span>
                </div>
                <div styleName="footer footer-login">
                    <div>
                        <span>没有账号？</span>
                        <span styleName="footer-text" onClick={toggleType}>注册</span>
                    </div>
                    <div styleName="footer-text">忘记密码</div>
                </div>
            </div>
        )
    }

    registerView() {
        const { popupState, hideAuthPopup, toggleType } = this.props
        const { phone, password, username } = this.state

        return (
            <div styleName={classNames({ content: true, active: popupState })}>
                <div styleName="header">
                    <h3 styleName="title">注册</h3>
                    <i className="iconfont" styleName="close" onClick={hideAuthPopup}>&#xe608;</i>
                </div>
                <div styleName="form">
                    <input type="text" placeholder="请输入用户名" styleName="input" value={username} onChange={(e) => this.updateFiled(e, 'username')} />
                    <input type="text" placeholder="请输入手机号" styleName="input" value={phone} onChange={(e) => this.updateFiled(e, 'phone')} />
                    <input
                        type="password"
                        placeholder="请输入密码(不少于6位)"
                        styleName="input"
                        value={password}
                        onChange={(e) => this.updateFiled(e, 'password')}
                    />
                    <span styleName="submit">注册</span>
                </div>
                <div styleName="footer">
                    <span styleName="footer-text" onClick={toggleType}>已有账号登录</span>
                </div>
            </div>
        )
    }

    render() {
        const { popupState, type } = this.props

        return (
            <div styleName={classNames({ 'popup-wrapper': true, active: popupState })}>
                {
                    type === 'login'
                        ? this.loginView()
                        : this.registerView()
                }
            </div>
        )
    }
}
