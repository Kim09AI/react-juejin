import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import ScrollAndTranslate from '../scrollAndTranslate'
import './style.styl'

@ScrollAndTranslate
export default class TabList extends React.Component {
    static defaultProps = {
        syncFixedTop: () => {}
    }

    static propTypes = {
        tabList: PropTypes.array.isRequired,
        getLink: PropTypes.func.isRequired,
        translateTo: PropTypes.bool.isRequired,
        syncFixedTop: PropTypes.func,
        selectedIndex: PropTypes.number.isRequired
    }

    state = {
        fixed: false
    }

    componentDidMount() {
        this._syncFixedTop()

        window.addEventListener('scroll', this.scrollToFixed)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollToFixed)
        clearTimeout(this.timer)
    }

    scrollToFixed = () => {
        const scrollTop = $(window).scrollTop()

        if (scrollTop >= this.top) {
            !this.state.fixed && this.setState({
                fixed: true
            })
        } else {
            this.state.fixed && this.setState({
                fixed: false
            })
        }
    }

    _syncFixedTop() {
        this.timer = setTimeout(() => {
            const { top } = $(this.tabListWrapper).offset()
            this.top = top
            // 通知调用者，本组件fixed的临界值
            this.props.syncFixedTop(top)
        }, 20)
    }

    render() {
        const { tabList, getLink, translateTo, selectedIndex } = this.props
        const { fixed } = this.state

        return (
            <div styleName="tab-list-wrapper" ref={tabListWrapper => { this.tabListWrapper = tabListWrapper }}>
                <div styleName={classNames({ 'tab-list': true, fixed, translate: fixed && !translateTo })}>
                    {
                        tabList.map((item, index) => (
                            <Link
                                to={getLink(item, index)}
                                key={item.name}
                                styleName={classNames({ item: true, active: selectedIndex === index })}
                            >
                                <div styleName="text">{item.name}</div>
                                {
                                    item.count !== undefined && <div styleName="count">{item.count}</div>
                                }
                            </Link>
                        ))
                    }
                </div>
            </div>
        )
    }
}
