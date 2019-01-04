import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
    trickleSpeed: 200,
    showSpinner: false
})

const mapState = ({ progressBar }) => ({
    start: progressBar.start,
    restart: progressBar.restart,
    finish: progressBar.finish
})

@withRouter
@connect(mapState)
export default class ProgressBar extends React.PureComponent {
    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        start: PropTypes.bool.isRequired,
        restart: PropTypes.number.isRequired,
        finish: PropTypes.bool.isRequired
    }

    componentDidUpdate(prevProps) {
        // 是否是跳转到新页面
        const isNewPage = prevProps.location.pathname !== this.props.history.location.pathname

        if (isNewPage && this.props.start === true && prevProps.start === false) {
            this.start()
        }

        if (isNewPage && this.props.start && prevProps.start && (this.props.restart !== prevProps.restart)) {
            this.restart()
        }

        if (this.props.finish === true && prevProps.finish === false) {
            this.done()
        }
    }

    start() {
        NProgress.start()
    }

    restart() {
        NProgress.set(0)
        NProgress.start()
    }

    done() {
        NProgress.done()
    }

    render() {
        return null
    }
}
