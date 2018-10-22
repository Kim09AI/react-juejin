import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { last } from 'lodash-es'
import EmptyContentTip from '../../components/emptyContentTip'
import Pullup from '../../components/pullup'
import { timeFormat, getComposeText, getPostId } from '../../utils'
import './style.styl'

const mapState = state => ({
    activitieList: state.activities.activitieList
})

const mapDispatch = ({ activities }) => ({
    getUserActivities: activities.getUserActivities
})

@connect(mapState, mapDispatch)
export default class Activities extends React.Component {
    static propTypes = {
        activitieList: PropTypes.array.isRequired,
        getUserActivities: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired
    }

    tagItem(item) {
        return (
            <div styleName="item" key={item.objectId}>
                <div styleName="item-header">
                    <span>关注了标签</span>
                    <span>{timeFormat(item.createdAtString)}</span>
                </div>
                <div styleName="item-body">
                    <div styleName="tag-icon" style={{ backgroundImage: `url(${item.tags[0].icon})` }} />
                    <div styleName="tag-title">{item.tags[0].title}</div>
                </div>
            </div>
        )
    }

    postItem(item) {
        return (
            <div styleName="item" key={item.objectId}>
                <div styleName="item-header">
                    <span>赞了文章</span>
                    <span>{timeFormat(item.createdAtString)}</span>
                </div>
                <div styleName="item-body post-wrapper">
                    <Link to={`/post/${getPostId(item.entry.originalUrl)}`} styleName="post-title">{item.entry.title}</Link>
                </div>
            </div>
        )
    }

    userItem(item) {
        const user = item.users[0]

        return (
            <div styleName="item" key={item.objectId}>
                <div styleName="item-header">
                    <span>关注了用户</span>
                    <span>{timeFormat(item.createdAtString)}</span>
                </div>
                <div styleName="item-body">
                    <Link to={`/user/${user.objectId}`} styleName="user-icon" style={{ backgroundImage: `url(${user.avatarLarge})` }} />
                    <div styleName="info">
                        <Link to={`/user/${user.objectId}`} styleName="name">{user.username}</Link>
                        <div styleName="pos">{getComposeText(' @ ', user.jobTitle, user.company)}</div>
                    </div>
                </div>
            </div>
        )
    }

    _getUserActivities = () => {
        const before = (last(this.props.activitieList) || {}).createdAtString

        return this.props.getUserActivities({
            more: true,
            targetUid: this.props.match.params.id,
            before
        })
    }

    render() {
        const { activitieList } = this.props

        return (
            <div className="white-bg">
                {
                    activitieList.length > 0
                        ? [
                            <div key="activitieList">
                                {
                                    activitieList.map(item => {
                                        if (item.type === 'subscribe' && item.tags.length) {
                                            return this.tagItem(item)
                                        }

                                        if (item.type === 'collection' && Object.keys(item.entry).length) {
                                            return this.postItem(item)
                                        }

                                        if (item.type === 'follow' && item.users.length) {
                                            return this.userItem(item)
                                        }

                                        return null
                                    })
                                }
                            </div>,
                            <Pullup key="loadMore" loader={this._getUserActivities} />
                        ]
                        : <EmptyContentTip />
                }
            </div>
        )
    }
}
