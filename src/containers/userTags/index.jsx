import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SubHeader from '../../components/subHeader'
import TagList from '../../components/tagList'
import EmptyContentTip from '../../components/emptyContentTip'
import './style.styl'

const mapState = state => ({
    tagList: state.userTags.tagList
})

const mapDispatch = ({ userTags: { toggleSubscribe } }) => ({
    toggleSubscribe
})

@connect(mapState, mapDispatch)
export default class UserTags extends React.Component {
    static propTypes = {
        tagList: PropTypes.array.isRequired,
        toggleSubscribe: PropTypes.func.isRequired
    }

    _toggleSubscribe = (tagId, index, isSubscribe) => {
        const payload = {
            tagId,
            index,
            isSubscribe,
            auth: true
        }

        return this.props.toggleSubscribe(payload)
    }

    render() {
        const { tagList } = this.props

        return (
            <div>
                <SubHeader title="关注的标签" />
                {
                    tagList.length > 0
                        ? <TagList list={tagList} onFollowBtnClick={this._toggleSubscribe} />
                        : <EmptyContentTip />
                }
            </div>
        )
    }
}
