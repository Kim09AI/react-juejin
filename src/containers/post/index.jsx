import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import CommentList from '../../components/commentList'
import EntryList from '../../components/entryList'
import Pullup from '../../components/pullup'
import { format } from '../../utils'
import './style.styl'

const mapState = ({ post, loading }) => ({
    info: post.info,
    content: post.content,
    commentList: post.commentList,
    loadComment: loading.effects.post.getComment,
    recommendEntry: post.recommendEntry
})

const mapDispatch = ({ post: { getComment, getRecommendEntryByTagIds } }) => ({
    getComment,
    getRecommendEntryByTagIds
})

@connect(mapState, mapDispatch)
export default class Post extends React.Component {
    static propTypes = {
        info: PropTypes.object.isRequired,
        content: PropTypes.object.isRequired,
        commentList: PropTypes.array.isRequired,
        loadComment: PropTypes.bool.isRequired,
        getComment: PropTypes.func.isRequired,
        recommendEntry: PropTypes.array.isRequired,
        getRecommendEntryByTagIds: PropTypes.func.isRequired
    }

    state = {
        comment: ''
    }

    componentDidMount() {
        const isLoadingRecommend = this.initCheckLoadRecommend()
        !isLoadingRecommend && window.addEventListener('scroll', this.lazyLoadRecommend)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.lazyLoadRecommend)
    }

    getTagIds(tags) {
        return tags && tags.map(item => item.id).join('|')
    }

    getRecommendEntry = () => {
        const { info, recommendEntry } = this.props
        const tagIds = this.getTagIds(info.tags)
        const before = recommendEntry[recommendEntry.length - 1] && recommendEntry[recommendEntry.length - 1].rankIndex

        return this.props.getRecommendEntryByTagIds({ tagIds, before })
    }

    initCheckLoadRecommend() {
        const { top, height } = $(this.commentWrapper).offset()
        const scrollTop = $(window).scrollTop()
        const winH = $(window).height()

        // 页面大概只有一个屏幕高度时
        if (top + height < winH + 200) {
            this.getRecommendEntry()
            return true
        }

        // 进入页面时滚动条高度就已经满足加载高度
        if (top + height < (scrollTop + winH + 200)) {
            this.getRecommendEntry()
            return true
        }

        return false
    }

    lazyLoadRecommend = () => {
        const { top, height } = $(this.commentWrapper).offset()
        const scrollTop = $(window).scrollTop()
        const winH = $(window).height()

        if (top + height < (scrollTop + winH + 200)) {
            this.getRecommendEntry()
            window.removeEventListener('scroll', this.lazyLoadRecommend)
        }
    }

    commentChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    _getMoreComment = () => {
        const { info, commentList } = this.props
        const data = {
            postId: info.objectId,
            createdAt: commentList[commentList.length - 1] && commentList[commentList.length - 1].createdAt,
            pageSize: 20,
            more: true
        }

        return this.props.getComment(data)
    }

    render() {
        const { info, content, commentList, loadComment, recommendEntry } = this.props
        const { comment } = this.state

        return (
            <div style={{ marginBottom: '50px' }}>
                <div className="main" styleName="post-wrapper">
                    <div styleName="user">
                        <Link to={`/user/${info.user.objectId}`}>
                            <div styleName="avatar" style={{ backgroundImage: `url(${info.user.avatarLarge})` }} />
                        </Link>
                        <div>
                            <div>
                                <Link to={`/user/${info.user.objectId}`} styleName="username">{info.user.username}</Link>
                            </div>
                            <div styleName="info">
                                <span>{format('yyyy年MM月dd日', info.verifyCreatedAt)}</span>
                                <span>&nbsp;&nbsp;阅读 {info.viewsCount}</span>
                            </div>
                        </div>
                    </div>
                    <div styleName="title">{info.title}</div>
                    <div className="markdown-body" styleName="markdown" dangerouslySetInnerHTML={{ __html: content.transcodeContent }} />
                    <div styleName="comment-wrapper" ref={commentWrapper => { this.commentWrapper = commentWrapper }}>
                        <div styleName="title">评论</div>
                        <div styleName="input-wrapper">
                            <input type="text" styleName="comment-input" placeholder="输入评论..." value={comment} onChange={this.commentChange} />
                        </div>
                        <CommentList list={commentList} />
                        {
                            commentList.length > 0 && (
                                <div styleName="load-more" onClick={this._getMoreComment}>{loadComment ? '加载中...' : '查看更多 >'}</div>
                            )
                        }
                    </div>
                </div>
                {
                    recommendEntry.length > 0 && (
                        <div styleName="recommend-wrapper">
                            <div styleName="recommend-title">相关推荐</div>
                            <EntryList entryList={recommendEntry} />
                            <Pullup loader={this.getRecommendEntry} />
                        </div>
                    )
                }
                <div styleName="action-wrapper">
                    <div styleName="action-content">
                        <div styleName="action-item">
                            <i className="iconfont" styleName="praise-icon">&#xe600;</i>
                            <span styleName="text">{info.collectionCount}</span>
                        </div>
                        <div styleName="action-item">
                            <i className="iconfont" styleName="comment-icon">&#xe662;</i>
                            <span styleName="text">{info.commentsCount}</span>
                        </div>
                        <div styleName="action-item">
                            <i className="iconfont" styleName="collect-icon">&#xe688;</i>
                            <span styleName="text">收藏</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
