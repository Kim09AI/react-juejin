import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './style.styl'

const mapState = ({ progressBar }) => ({
    start: progressBar.start,
    restart: progressBar.restart,
    finish: progressBar.finish
})

@withRouter
@connect(mapState)
export default class ProgressBar extends React.PureComponent {
    static propTypes = {
        location: PropTypes.object.isRequired, // eslint-disable-line
        history: PropTypes.object.isRequired, // eslint-disable-line
        start: PropTypes.bool.isRequired,
        restart: PropTypes.number.isRequired,
        finish: PropTypes.bool.isRequired
    }

    constructor() {
        super()
        this.state = {
            percent: 0,
            show: false,
            canSuccess: true,
            duration: 3000,
            color: '#007fff',
            failedColor: '#ff0000'
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line
        // 是否是跳转到新页面
        const isNewPage = nextProps.location.pathname !== nextProps.history.location.pathname

        if (isNewPage && nextProps.start === true && this.props.start === false) {
            this.start()
        }

        if (isNewPage && nextProps.start && this.props.start && (nextProps.restart !== this.props.restart)) {
            this.start()
        }

        if (nextProps.finish === true && this.props.finish === false) {
            this.state.percent <= 95 && this.finish()
        }
    }

    start() {
        this.setState({
            show: true,
            canSuccess: true
        })

        if (this._timer) {
            clearInterval(this._timer)
            this.setState({
                percent: 0
            })
        }

        this._cut = 10000 / Math.floor(this.state.duration)
        this._timer = setInterval(() => {
            this.increase(this._cut * Math.random())
            if (this.state.percent > 95) {
                this.finish()
            }
        }, 100)
        return this
    }

    set(num) {
        this.setState({
            show: true,
            canSuccess: true,
            percent: Math.floor(num)
        })
        return this
    }

    get() {
        return Math.floor(this.state.percent)
    }

    increase(num) {
        this.setState(prevState => ({
            percent: prevState.percent + Math.floor(num)
        }))
        return this
    }

    decrease(num) {
        this.setState(prevState => ({
            percent: prevState.percent - Math.floor(num)
        }))
        return this
    }

    finish() {
        this.setState({
            percent: 100
        })
        this.hide()
        return this
    }

    pause() {
        clearInterval(this._timer)
        return this
    }

    hide() {
        clearInterval(this._timer)
        this._timer = null
        setTimeout(() => {
            this.setState({
                show: false
            })

            setTimeout(() => {
                this.setState({
                    percent: 0
                })
            }, 500)
        }, 300)
        return this
    }

    fail() {
        this.setState({
            canSuccess: false
        })
        return this
    }

    render() {
        const { percent, canSuccess, color, failedColor, show } = this.state

        return (
            <div
                styleName="progress"
                style={{
                    width: `${percent}%`,
                    height: '2px',
                    backgroundColor: canSuccess ? color : failedColor,
                    opacity: show ? 1 : 0
                }}
            />
        )
    }
}
