import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

let isForwardOrBack
if (process.env.isClient) {
    // 需要保证能够在router监听popstate事件之前绑定
    // 以保证能够在整个路由切换过程中拿到路由切换方式，是pushState还是前进后退
    window.addEventListener('popstate', () => {
        isForwardOrBack = true
    })
}

@withRouter
export default class ScrollRestoration extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            const prevUrl = prevProps.location.pathname + prevProps.location.search
            const url = this.props.location.pathname + this.props.location.search
            const matched = prevUrl === url

            if (!isForwardOrBack) {
                // 仅对pushState跳转的页面滚到顶部
                // 前进或后退则依靠浏览器默认的页面导航滚动恢复即可
                !matched && window.scrollTo(0, 0)
            } else {
                isForwardOrBack = false
            }
        }
    }

    render() {
        return null
    }
}
