import React from 'react'
import PropTypes from 'prop-types'
import './style.styl'

export default function SubHeader(props) {
    const { title } = props

    return (
        <div styleName="sub-header">
            <span styleName="title">{title}</span>
        </div>
    )
}

SubHeader.propTypes = {
    title: PropTypes.string.isRequired
}
