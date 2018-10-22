import React from 'react'
import PropTypes from 'prop-types'
import ReactSwipe from 'react-swipe'
import { range } from 'lodash-es'
import classNames from 'classnames'
import './style.styl'

export default class Carousel extends React.Component {
    static defaultProps = {
        callback: () => {},
        transitionEnd: () => {},
        continuous: true,
        className: ''
    }

    static propTypes = {
        callback: PropTypes.func,
        transitionEnd: PropTypes.func,
        continuous: PropTypes.bool,
        className: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]).isRequired
    }

    state = {
        total: 0,
        currentIndex: 0
    }

    componentDidMount() {
        this.setState({
            total: this.reactSwipe.getNumSlides()
        })
    }

    prev = () => {
        this.reactSwipe.prev()
    }

    next = () => {
        this.reactSwipe.next()
    }

    callback = (index, el) => {
        this.setState({
            currentIndex: index
        })

        this.props.callback(index, el)
    }

    render() {
        const { continuous, className, children, transitionEnd } = this.props
        const { total, currentIndex } = this.state

        return (
            <div styleName="carousel-wrapper">
                <ReactSwipe
                    className={className}
                    ref={reactSwipe => { this.reactSwipe = reactSwipe }}
                    swipeOptions={{
                        continuous,
                        callback: this.callback,
                        transitionEnd
                    }}
                >
                    {children}
                </ReactSwipe>
                <i className="iconfont" styleName="arrow left-arrow" onClick={this.prev}>&#xe645;</i>
                <i className="iconfont" styleName="arrow right-arrow" onClick={this.next}>&#xe658;</i>
                <div styleName="dots">
                    {
                        range(0, total).map((item, index) => (
                            <span key={item} styleName={classNames({ 'dot-item': true, active: currentIndex === index })} />
                        ))
                    }
                </div>
            </div>
        )
    }
}
