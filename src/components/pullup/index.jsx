import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash-es'

export default class Pullup extends React.Component {
    static defaultProps = {
        loading: null
    }

    static propTypes = {
        loading: PropTypes.element,
        loader: PropTypes.func.isRequired
    }

    state = {
        loaded: false
    }

    componentDidMount() {
        this._scroll = debounce(this.scroll, 100)
        window.addEventListener('scroll', this._scroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._scroll)
    }

    scroll = async () => {
        if (this.state.loaded) return

        const top = document.documentElement.scrollTop || document.body.scrollTop
        const docH = document.documentElement.scrollHeight || document.body.scrollHeight
        const { clientHeight } = document.documentElement

        if (top + clientHeight <= docH - 100) {
            return
        }

        try {
            this.setState({
                loaded: true
            })
            await this.props.loader()
        } finally {
            this.setState({
                loaded: false
            })
        }
    }

    render() {
        const { loaded } = this.state
        const { loading: Component } = this.props

        return loaded && Component ? <Component /> : null
    }
}
