import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { timeFormat, getPostId } from '../../utils'
import './style.styl'

export default function EntryList(props) {
    const { entryList, onApproveClick } = props

    return (
        <ul styleName="entry-list-wrapper">
            {
                entryList.map((item, index) => (
                    <li key={item.objectId} styleName="item">
                        <div styleName="info-wrapper">
                            <span styleName="hot">热门</span>
                            <span styleName="circle">·</span>
                            <span styleName="post">专栏</span>
                            <span styleName="circle">·</span>
                            <span>{item.user.username}</span>
                            <span styleName="circle">·</span>
                            <span>{timeFormat(item.createdAt)}</span>
                            <span styleName="circle">·</span>
                            <span>{item.tags[0] && item.tags[0].title}</span>
                        </div>
                        <div styleName="title-wrapper">
                            <Link to={`/post/${getPostId(item.originalUrl)}`} styleName="title">{item.title}</Link>
                        </div>
                        <div>
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
                            <div styleName="action-wrapper">
                                <div styleName="action-item">
                                    <i className="iconfont" styleName="share">&#xe6a5;</i>
                                </div>
                                <div styleName="action-item">
                                    <i className="iconfont" styleName="collect">&#xe632;</i>
                                </div>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

EntryList.propTypes = {
    entryList: PropTypes.array.isRequired,
    onApproveClick: PropTypes.func.isRequired
}
