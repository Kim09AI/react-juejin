import React from 'react'
import PropTypes from 'prop-types'

export default Component => class extends React.Component {
    static defaultProps = {
        boundaryTop: 200, // 隐藏组件的临界点滚动条高度
    }

    static propTypes = {
        boundaryTop: PropTypes.number
    }

    state = {
        translateTo: true
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll)
    }

    scroll = () => {
        const top = document.documentElement.scrollTop || document.body.scrollTop
        const prevTop = this.prevTop !== undefined ? this.prevTop : top

        if (top > prevTop && top > this.props.boundaryTop) {
            this.state.translateTo === true && this.setState({
                translateTo: false
            })
        } else if (top < prevTop) {
            this.state.translateTo === false && this.setState({
                translateTo: true
            })
        }

        this.prevTop = top
    }

    render() {
        return <Component {...this.props} translateTo={this.state.translateTo} />
    }
}
