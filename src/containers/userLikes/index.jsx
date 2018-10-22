import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Pullup from '../../components/pullup'
import EntryList from '../../components/entryList'
import SubHeader from '../../components/subHeader'
import EmptyContentTip from '../../components/emptyContentTip'
import './style.styl'

const mapState = state => ({
    entryList: state.userLikes.entryList
})

const mapDispatch = ({ userLikes: { getUserLikeEntry, toggleEntryLike } }) => ({
    getUserLikeEntry,
    toggleEntryLike
})

@connect(mapState, mapDispatch)
export default class UserLikes extends React.Component {
    static propTypes = {
        entryList: PropTypes.array.isRequired,
        getUserLikeEntry: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired,
        toggleEntryLike: PropTypes.func.isRequired
    }

    _getUserLikeEntry = () => {
        const payload = {
            more: true,
            targetUid: this.props.match.params.id
        }

        return this.props.getUserLikeEntry(payload)
    }

    _toggleEntryLike = (postId, index, isApprove) => {
        const payload = {
            postId,
            index,
            isApprove,
            auth: true
        }

        return this.props.toggleEntryLike(payload)
    }

    render() {
        const { entryList } = this.props

        return (
            <div>
                <SubHeader title="赞的文章" />
                {
                    entryList.length > 0
                        ? [
                            <EntryList key="entryList" entryList={entryList} onApproveClick={this._toggleEntryLike} />,
                            <Pullup key="loadMore" loader={this._getUserLikeEntry} />
                        ]
                        : <EmptyContentTip />
                }
            </div>
        )
    }
}
