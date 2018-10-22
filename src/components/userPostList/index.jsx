import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { getPostId, timeFormat } from '../../utils'
import './style.styl'

export default function UserPostList(props) {
    const { list, onApproveClick, userDetail } = props

    return (
        <ul styleName="user-post-list">
            {
                list.map((item, index) => (
                    <li key={item.objectId} styleName="item">
                        <div styleName="header">
                            <Link
                                styleName="avatar"
                                to={`/user/${userDetail.objectId}`}
                                style={{ backgroundImage: `url(${userDetail.avatarLarge})` }}
                            />
                            <Link styleName="username" to={`/user/${userDetail.objectId}`}>{userDetail.username}</Link>
                            <span styleName="circle">·</span>
                            <span styleName="time">{timeFormat(item.createdAt)}</span>
                        </div>
                        <Link styleName="title" to={`/post/${getPostId(item.originalUrl)}`}>{item.title}</Link>
                        <Link styleName="sub-content" to={`/post/${getPostId(item.originalUrl)}`}>{item.content}</Link>
                        <div styleName="footer">
                            <div styleName="action-wrapper">
                                <div
                                    styleName={classNames({ 'action-item': true, active: item.isCollected })}
                                    onClick={() => onApproveClick(item.objectId, index, !item.isCollected)}
                                >
                                    <i className="iconfont" styleName="approve">&#xe630;</i>
                                    {item.collectionCount > 0 && <span styleName="text">{item.collectionCount}</span>}
                                </div>
                                <div styleName="action-item">
                                    <i className="iconfont" styleName="comment">&#xe684;</i>
                                    {
                                        item.commentsCount > 0 && (
                                            <Link to={`/post/${getPostId(item.originalUrl)}?pos=comment`} styleName="text">{item.commentsCount}</Link>
                                        )
                                    }
                                </div>
                            </div>
                            <Link styleName="read-post-action" to={`/post/${getPostId(item.originalUrl)}`}>阅读全文</Link>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

UserPostList.propTypes = {
    list: PropTypes.array.isRequired,
    onApproveClick: PropTypes.func.isRequired,
    userDetail: PropTypes.object.isRequired
}
