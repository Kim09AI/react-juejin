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
        translateTo: false, // 是否满足位移条件
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll)
    }

    scroll = () => {
        const top = $(window).scrollTop()
        const prevTop = this.prevTop !== undefined ? this.prevTop : top

        // 上拉页面超过临界点，即满足位移的条件
        if (top > prevTop && top > this.props.boundaryTop) {
            this.state.translateTo === false && this.setState({
                translateTo: true
            })
        } else if (top < prevTop) {
            // 下拉页面
            this.state.translateTo === true && this.setState({
                translateTo: false
            })
        }

        this.prevTop = top
    }

    render() {
        return <Component {...this.props} translateTo={this.state.translateTo} />
    }
}
