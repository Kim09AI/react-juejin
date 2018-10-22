import React from 'react'
import PropTypes from 'prop-types'
import './style.styl'

export default class ErrorBoundary extends React.Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    }

    state = {
        hasError: false
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    render() {
        if (this.state.hasError) {
            return (
                <div styleName="error-wrapper">
                    <div styleName="error-title">页面出错了</div>
                    <a styleName="error-link" href="/">回到首页</a>
                </div>
            )
        }

        return this.props.children
    }
}
