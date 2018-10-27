import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { timeFormat, getComposeText } from '../../utils'
import './style.styl'

export default function CommentList(props) {
    const { list, onLikeClick } = props

    return (
        <ul styleName="comment-list">
            {
                list.map((item, index) => (
                    <li key={item.id} styleName="item">
                        <Link to={`/user/${item.userInfo.objectId}`}>
                            <div styleName="avatar" style={{ backgroundImage: `url(${item.userInfo.avatarLarge})` }} />
                        </Link>
                        <div styleName="body">
                            <div styleName="info">
                                <Link to={`/user/${item.userInfo.objectId}`} styleName="username">{item.userInfo.username}</Link>
                                <span styleName="position">
                                    {getComposeText(' @ ', item.userInfo.jobTitle, item.userInfo.company)}
                                </span>
                            </div>
                            <div styleName="comment">{item.content}</div>
                            <div styleName="other-info">
                                <div styleName="time">{timeFormat(item.createdAt)}</div>
                                <div styleName="action-box">
                                    <div
                                        styleName={classNames({ 'action-item': true, active: item.isLike })}
                                        onClick={() => onLikeClick(item.id, !item.isLike, index)}
                                    >
                                        <i className="iconfont" styleName="like">&#xe600;</i>
                                        {!!item.likesCount && <span>{item.likesCount}</span>}
                                    </div>
                                    <div styleName="action-item">
                                        <i className="iconfont" styleName="reply-icon">&#xe662;</i>
                                        <span>回复</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

CommentList.propTypes = {
    list: PropTypes.array.isRequired,
    onLikeClick: PropTypes.func.isRequired
}
