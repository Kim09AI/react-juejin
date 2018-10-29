import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import VirtualList from 'react-virtual-list'
import { timeFormat, getPostId } from '../../utils'
import './style.styl'

function VirtualEntryList(props) {
    const { virtual, onApproveClick, itemHeight } = props

    return (
        <ul styleName="entry-list-wrapper" style={virtual.style}>
            {
                virtual.items.map((item, index) => (
                    <li key={item.objectId} styleName="item" style={{ height: itemHeight }}>
                        <div styleName="info-wrapper">
                            <span styleName="hot right-circle">热门</span>
                            <span styleName="post">专栏</span>
                            <span styleName="left-circle">{item.user.username}</span>
                            <span styleName="left-circle">{timeFormat(item.createdAt)}</span>
                            {
                                item.tags[0] && <span styleName="left-circle">{item.tags[0].title}</span>
                            }
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
                                <Link styleName="action-item" to={`/post/${getPostId(item.originalUrl)}?pos=comment`}>
                                    <i className="iconfont" styleName="comment">&#xe684;</i>
                                    {
                                        item.commentsCount > 0 && (
                                            <span styleName="text">{item.commentsCount}</span>
                                        )
                                    }
                                </Link>
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

VirtualEntryList.propTypes = {
    virtual: PropTypes.object.isRequired,
    itemHeight: PropTypes.number.isRequired,
    onApproveClick: PropTypes.func.isRequired
}

export default VirtualList({
    initialState: {
        firstItemIndex: 0,
        lastItemIndex: 20
    }
})(VirtualEntryList)
