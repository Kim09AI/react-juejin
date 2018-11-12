import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import classNames from 'classnames'
import qs from 'qs'
import { last } from 'lodash-es'
import { toast } from 'react-toastify'

import Header from '../../components/header'
import CommentList from '../../components/commentList'
import VirtualEntryList from '../../components/virtualEntryList'
import Pullup from '../../components/pullup'
import EmptyContentTip from '../../components/emptyContentTip'
import CommentInput from '../../components/commentInput'
import { format } from '../../utils'
import { scrollToElement } from '../../utils/dom'
import './style.styl'

const mapState = ({ post, loading }) => ({
    info: post.info,
    content: post.content,
    commentList: post.commentList,
    loadingComment: loading.effects.post.getComment,
    recommendEntry: post.recommendEntry,
    tagIds: post.tagIds,
    commentCount: post.commentCount
})

const mapDispatch = ({ post }) => ({
    getComment: post.getComment,
    getRecommendEntryByTagIds: post.getRecommendEntryByTagIds,
    togglePostLike: post.togglePostLike,
    checkPostLike: post.checkPostLike,
    toggleRecommendEntryLike: post.toggleRecommendEntryLike,
    toggleCommentLike: post.toggleCommentLike
})

@connect(mapState, mapDispatch)
export default class Post extends React.Component {
    static propTypes = {
        info: PropTypes.object.isRequired,
        content: PropTypes.object.isRequired,
        commentList: PropTypes.array.isRequired,
        loadingComment: PropTypes.bool.isRequired,
        getComment: PropTypes.func.isRequired,
        recommendEntry: PropTypes.array.isRequired,
        getRecommendEntryByTagIds: PropTypes.func.isRequired,
        togglePostLike: PropTypes.func.isRequired,
        checkPostLike: PropTypes.func.isRequired,
        toggleRecommendEntryLike: PropTypes.func.isRequired,
        toggleCommentLike: PropTypes.func.isRequired,
        tagIds: PropTypes.string.isRequired,
        commentCount: PropTypes.number.isRequired,
        location: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.init()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            const isLoadingRecommend = this.initCheckLoadRecommend()
            !isLoadingRecommend && window.addEventListener('scroll', this.lazyLoadRecommend)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.lazyLoadRecommend)
        clearTimeout(this.timer)
    }

    init() {
        if (Object.keys(this.props.info).length === 0) {
            return
        }

        const isLoadingRecommend = this.initCheckLoadRecommend()
        !isLoadingRecommend && window.addEventListener('scroll', this.lazyLoadRecommend)

        this.props.checkPostLike({ postId: this.props.info.objectId })

        const search = window.location.search.substr(1)
        const { pos } = qs.parse(search)
        if (pos === 'comment') {
            this.timer = setTimeout(() => {
                this.scrollToComment()
            }, 20)
        }
    }

    commentSubmit = (value) => {
        console.log(value)
        toast.info('功能未开发')
    }

    getTagIds(tags) {
        return tags && tags.map(item => item.id).join('|')
    }

    getRecommendEntry = (more = false) => {
        const { info, recommendEntry } = this.props
        const tagIds = this.getTagIds(info.tags)
        const before = more ? (last(recommendEntry) || {}).rankIndex : undefined

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

    scrollToComment = () => {
        scrollToElement(this.commentWrapper, -100)
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

    _togglePostLike = () => {
        const payload = {
            postId: this.props.info.objectId,
            isApprove: !this.props.info.isCollected,
            auth: true
        }

        return this.props.togglePostLike(payload)
    }

    _toggleRecommentPostLike = (postId, index, isApprove) => {
        const payload = {
            postId,
            index,
            isApprove,
            auth: true
        }

        return this.props.toggleRecommendEntryLike(payload)
    }

    _toggleCommentLike = (commentId, isLike, index) => {
        const payload = {
            postId: this.props.info.objectId,
            commentId,
            isLike,
            index,
            auth: true
        }

        return this.props.toggleCommentLike(payload)
    }

    render() {
        const { info, content, commentList, loadingComment, recommendEntry, tagIds, commentCount } = this.props

        if (Object.keys(info).length === 0) {
            return (
                <div>
                    <Header boundaryTop={800} />
                    <EmptyContentTip tip="找不到该文章或该文章非掘金站内文章" />
                </div>
            )
        }

        return (
            <div style={{ marginBottom: '50px' }}>
                <Helmet>
                    <title>{info.title} - 掘金</title>
                </Helmet>
                <Header boundaryTop={800} />
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
                        <CommentInput submit={this.commentSubmit} />
                        <CommentList list={commentList} onLikeClick={this._toggleCommentLike} />
                        {
                            commentList.length > 0 && commentList.length < commentCount && (
                                <div styleName="load-more" onClick={this._getMoreComment}>{loadingComment ? '加载中...' : '查看更多 >'}</div>
                            )
                        }
                    </div>
                </div>
                {
                    tagIds === this.getTagIds(info.tags) && recommendEntry.length > 0 && (
                        <div styleName="recommend-wrapper">
                            <div styleName="recommend-title">相关推荐</div>
                            <VirtualEntryList
                                items={recommendEntry}
                                itemHeight={108}
                                itemBuffer={8}
                                contained={false}
                                onApproveClick={this._toggleRecommentPostLike}
                            />
                            <Pullup loader={() => this.getRecommendEntry(true)} />
                        </div>
                    )
                }
                <div styleName="action-wrapper">
                    <div styleName="action-content">
                        <div styleName={classNames({ 'action-item': true, active: info.isCollected })} onClick={this._togglePostLike}>
                            <i
                                className="iconfont"
                                styleName="praise-icon"
                                dangerouslySetInnerHTML={{ __html: info.isCollected ? '&#xe630;' : '&#xe600;' }}
                            />
                            <span styleName="text">{info.collectionCount}</span>
                        </div>
                        <div styleName="action-item" onClick={this.scrollToComment}>
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
