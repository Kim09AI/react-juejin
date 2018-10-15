import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import ScrollAndTranslate from '../scrollAndTranslate'
import './style.styl'

@ScrollAndTranslate
export default class NavList extends React.Component {
    static defaultProps = {
        initClass: '',
        translateClass: ''
    }

    static propTypes = {
        list: PropTypes.array.isRequired,
        selectedIndex: PropTypes.number.isRequired,
        getLink: PropTypes.func.isRequired,
        initClass: PropTypes.string,
        translateClass: PropTypes.string,
        translateTo: PropTypes.bool.isRequired
    }

    render() {
        const { list, selectedIndex, getLink, initClass, translateClass, translateTo } = this.props

        return (
            <div styleName="nav-wrapper">
                <ul
                    className={classNames({ [initClass]: true, [translateClass]: translateTo })}
                    styleName={classNames({ 'nav-list': true, translate: translateTo })}
                >
                    {
                        list.map((nav, index) => (
                            <li key={nav.id} styleName="item">
                                <Link
                                    to={getLink(nav, index)}
                                    styleName={classNames({ nav: true, active: selectedIndex === index })}
                                >
                                    {nav.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
