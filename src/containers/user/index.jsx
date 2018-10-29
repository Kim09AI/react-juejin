import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import Helmet from 'react-helmet'
import Header from '../../components/header'
import UserPanel from '../../components/userPanel'
import TabList from '../../components/tabList'
import EmptyContentTip from '../../components/emptyContentTip'
import './style.styl'

const mapState = ({ user }) => ({
    isLogin: user.isLogin,
    uid: user.uid,
    userDetail: user.userDetail,
    otherUserDetail: user.otherUserDetail,
})

const mapDispatch = ({ user: { checkCurrentUserFollow, toggleUserFollow } }) => ({
    checkCurrentUserFollow,
    toggleUserFollow
})

@connect(mapState, mapDispatch)
export default class User extends React.Component {
    static propTypes = {
        isLogin: PropTypes.bool.isRequired,
        uid: PropTypes.string.isRequired,
        userDetail: PropTypes.object.isRequired,
        otherUserDetail: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        route: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        checkCurrentUserFollow: PropTypes.func.isRequired,
        toggleUserFollow: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        const currentId = props.match.params.id
        const detail = this.getUserDetail(currentId)
        this.state = {
            boundaryTop: 800,
            currentId,
            userMenus: this.getUserMenu(detail)
        }
    }

    componentDidMount() {
        this.checkCurrentUserFollow()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            const currentId = nextProps.match.params.id
            const detail = this.getUserDetail(currentId)

            this.setState({
                currentId,
                userMenus: this.getUserMenu(detail)
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.checkCurrentUserFollow()
        }
    }

    setBoundaryTop = (boundaryTop) => {
        this.setState({
            boundaryTop
        })
    }

    getUserDetail(currentId) {
        const { isLogin, uid, userDetail, otherUserDetail } = this.props

        if (!isLogin) {
            return otherUserDetail
        }

        return uid === currentId ? userDetail : otherUserDetail
    }

    getUserMenu(detail) {
        return [
            { name: '动态', path: 'activities' },
            { name: '专栏', path: 'posts', count: detail.postedPostsCount },
            { name: '沸点', path: 'pins', count: detail.pinCount },
            { name: '赞', path: 'likes', count: detail.collectedEntriesCount },
            { name: '关注', path: 'tags' }
        ]
    }

    getSelectedIndex() {
        const { pathname } = this.props.location
        const path = pathname.split('/')[3] || 'activities'
        const index = this.state.userMenus.findIndex(item => item.path === path)

        return index
    }

    checkCurrentUserFollow() {
        const { uid, isLogin } = this.props
        const { currentId } = this.state

        if (isLogin && uid !== currentId) {
            this.props.checkCurrentUserFollow({
                currentUid: uid,
                targetUids: currentId
            })
        }
    }

    _toggleUserFollow = () => {
        const payload = {
            targetUid: this.props.otherUserDetail.objectId,
            auth: true
        }

        return this.props.toggleUserFollow(payload)
    }

    render() {
        const { isLogin, uid, route } = this.props
        const { boundaryTop, currentId, userMenus } = this.state

        const currentUserDetail = this.getUserDetail(currentId)

        if (Object.keys(currentUserDetail).length === 0) {
            return (
                <div>
                    <Header boundaryTop={boundaryTop} />
                    <EmptyContentTip tip={isLogin ? '找不到该用户' : '尚未登录，无法获取用户数据'} />
                </div>
            )
        }

        return (
            <div>
                <Helmet>
                    <title>{currentUserDetail.username} 的个人主页 - 掘金</title>
                </Helmet>
                <Header boundaryTop={boundaryTop} />
                <div className="main">
                    <UserPanel detail={currentUserDetail} isSelf={isLogin && uid === currentId} onFollowClick={this._toggleUserFollow} />
                </div>
                <div styleName="user-menu-wrapper">
                    <TabList
                        boundaryTop={0}
                        key={currentId}
                        syncFixedTop={this.setBoundaryTop}
                        tabList={userMenus}
                        getLink={item => `/user/${this.state.currentId}/${item.path}`}
                        selectedIndex={this.getSelectedIndex()}
                    />
                    {renderRoutes(route.routes)}
                </div>
            </div>
        )
    }
}
