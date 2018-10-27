import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { last, head } from 'lodash-es'
import { timeFormat, getPostId } from '../../utils'
import './style.styl'

export default class EntryList extends React.Component {
    static propTypes = {
        entryList: PropTypes.array.isRequired,
        onApproveClick: PropTypes.func.isRequired
    }

    shouldComponentUpdate(nextProps) {
        // eslint-disable-next-line
        for (let [key, value] of Object.entries(this.props)) {
            if (nextProps[key] !== value) {
                return true
            }
        }

        const nextEntryList = nextProps.entryList
        const { entryList } = this.props

        if (nextEntryList.length !== entryList.length) {
            return true
        }

        // entryList是只会往后面添加新的数据或者整个替换掉
        if (head(nextEntryList) === head(entryList) && last(nextEntryList) === last(entryList)) {
            return false
        }

        return true
    }

    render() {
        const { entryList, onApproveClick } = this.props

        return (
            <ul styleName="entry-list-wrapper">
                {
                    entryList.map((item, index) => (
                        <li key={item.objectId} styleName="item">
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
}
