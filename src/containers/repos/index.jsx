import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RepoList from '../../components/repoList'
import Pullup from '../../components/pullup'
import './style.styl'

const mapState = state => ({
    repoList: state.repos.repoList
})

const mapDispatch = ({ repos: { getRepoList } }) => ({
    getRepoList
})

@connect(mapState, mapDispatch)
export default class Repos extends React.Component {
    static propTypes = {
        repoList: PropTypes.array.isRequired,
        getRepoList: PropTypes.func.isRequired
    }

    _getRepoList = () => {
        const { repoList, getRepoList } = this.props
        const before = repoList[repoList.length - 1] && repoList[repoList.length - 1].localCreatedAt
        return getRepoList({ more: true, before })
    }

    render() {
        const { repoList } = this.props

        return (
            <div className="main">
                <div styleName="header">
                    <h3 styleName="title">推荐开源库</h3>
                    <div styleName="btn">
                        <i className="iconfont" styleName="setting">&#xe781;</i>
                        <span>定制推荐</span>
                    </div>
                </div>
                <RepoList list={repoList} />
                <Pullup loader={this._getRepoList} />
            </div>
        )
    }
}
