import React from 'react'
import PropTypes from 'prop-types'
import './style.styl'

export default function UserPanel(props) {
    const { detail } = props

    return (
        <div styleName="user-pannel-wrapper">
            <div styleName="avatar" />
            <div styleName="info-box">
                <div styleName="name">{detail.name}</div>
                <div styleName="pos">{detail.pos}</div>
                <div styleName="intro">{detail.intro}</div>
                <div>
                    <span>关注</span>
                </div>
            </div>
        </div>
    )
}

UserPanel.propTypes = {
    detail: PropTypes.object.isRequired
}
