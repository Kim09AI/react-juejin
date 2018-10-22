import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { last } from 'lodash-es'
import Pullup from '../../components/pullup'
import SubHeader from '../../components/subHeader'
import UserPostList from '../../components/userPostList'
import EmptyContentTip from '../../components/emptyContentTip'
import './style.styl'

const mapState = ({ user, userPosts }) => ({
    entryList: userPosts.entryList,
    isLogin: user.isLogin,
    uid: user.uid,
    userDetail: user.userDetail,
    otherUserDetail: user.otherUserDetail,
})

const mapDispatch = ({ userPosts: { getUserPosts, toggleUserPostLike } }) => ({
    getUserPosts,
    toggleUserPostLike
})

@connect(mapState, mapDispatch)
export default class UserPosts extends React.Component {
    static propTypes = {
        entryList: PropTypes.array.isRequired,
        getUserPosts: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired,
        isLogin: PropTypes.bool.isRequired,
        uid: PropTypes.string.isRequired,
        userDetail: PropTypes.object.isRequired,
        otherUserDetail: PropTypes.object.isRequired,
        toggleUserPostLike: PropTypes.func.isRequired
    }

    getUserDetail() {
        const { isLogin, uid, userDetail, otherUserDetail, match } = this.props
        const targetUid = match.params.id

        if (!isLogin) {
            return otherUserDetail
        }

        return uid === targetUid ? userDetail : otherUserDetail
    }

    _getUserPosts = () => {
        const { entryList, getUserPosts, match } = this.props
        const before = (last(entryList) || {}).createdAt

        return getUserPosts({
            targetUid: match.params.id,
            more: true,
            before
        })
    }

    _toggleUserPostLike = (postId, index, isApprove) => {
        const payload = {
            postId,
            index,
            isApprove,
            auth: true
        }

        return this.props.toggleUserPostLike(payload)
    }

    render() {
        const { entryList } = this.props
        const userDetail = this.getUserDetail()

        return (
            <div className="white-bg">
                <SubHeader title="最新专栏" />
                {
                    entryList.length > 0
                        ? [
                            <UserPostList key="postList" list={entryList} userDetail={userDetail} onApproveClick={this._toggleUserPostLike} />,
                            <Pullup key="loadMore" loader={this._getUserPosts} />
                        ]
                        : <EmptyContentTip />
                }
            </div>
        )
    }
}
