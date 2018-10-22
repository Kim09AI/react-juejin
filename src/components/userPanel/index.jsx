import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.styl'

export default function UserPanel(props) {
    const { detail, isSelf, onFollowClick } = props

    return (
        <div styleName="user-pannel-wrapper">
            <div styleName="avatar" style={{ backgroundImage: `url(${detail.avatarLarge})` }} />
            <div styleName="info-box">
                <div>
                    <span styleName="name">{detail.username}</span>
                </div>
                {
                    (!!detail.jobTitle || !!detail.company) && (
                        <div styleName="pos">
                            <span>{detail.jobTitle}</span>
                            {
                                !!detail.jobTitle && !!detail.company && <span styleName="split" />
                            }
                            <span>{detail.company}</span>
                        </div>
                    )
                }
                {
                    !!detail.selfDescription && <div styleName="desc">{detail.selfDescription}</div>
                }
            </div>
            {
                !isSelf && (
                    <div>
                        <span
                            styleName={classNames({ 'follow-btn': true, active: detail.isFollow })}
                            onClick={onFollowClick}
                        >
                            {detail.isFollow ? '已关注' : '关注'}
                        </span>
                    </div>
                )
            }
        </div>
    )
}

UserPanel.propTypes = {
    detail: PropTypes.object.isRequired,
    isSelf: PropTypes.bool.isRequired,
    onFollowClick: PropTypes.func.isRequired
}
