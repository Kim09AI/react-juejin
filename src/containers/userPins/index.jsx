import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { last } from 'lodash-es'
import Pullup from '../../components/pullup'
import PinList from '../../components/pinList'
import EmptyContentTip from '../../components/emptyContentTip'
import './style.styl'

const mapState = state => ({
    pinList: state.userPins.pinList
})

const mapDispatch = ({ userPins: { getUserPinList } }) => ({
    getUserPinList
})

@connect(mapState, mapDispatch)
export default class UserPins extends React.Component {
    static propTypes = {
        pinList: PropTypes.array.isRequired,
        getUserPinList: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired
    }

    _getUserPinList = () => {
        const { pinList, getUserPinList, match } = this.props
        const before = (last(pinList) || {}).createdAt

        return getUserPinList({
            targetUid: match.params.id,
            more: true,
            before
        })
    }

    render() {
        const { pinList } = this.props

        return (
            <div>
                {
                    pinList.length > 0
                        ? [
                            <PinList key="pinList" list={pinList} />,
                            <Pullup key="loadMore" loader={this._getUserPinList} />
                        ]
                        : <EmptyContentTip />
                }
            </div>
        )
    }
}
