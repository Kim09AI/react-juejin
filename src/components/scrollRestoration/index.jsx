import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

@withRouter
export default class ScrollRestoration extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            if (!window.isForwardOrBack) {
                window.scrollTo(0, 0)
            } else {
                window.isForwardOrBack = false
            }
        }
    }

    render() {
        return null
    }
}
