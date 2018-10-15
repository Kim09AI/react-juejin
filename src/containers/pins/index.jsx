import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { last } from 'lodash-es'
import PinList from '../../components/pinList'
import Pullup from '../../components/pullup'
import './style.styl'

const mapState = state => ({
    pinList: state.pins.pinList
})

const mapDispatch = ({ pins }) => ({
    getPinList: pins.getPinList
})

@connect(mapState, mapDispatch)
export default class Pins extends React.Component {
    static propTypes = {
        pinList: PropTypes.array.isRequired,
        getPinList: PropTypes.func.isRequired
    }

    _getPinList = () => {
        const item = last(this.props.pinList) || {}
        const before = item.updatedAt

        return this.props.getPinList({
            more: true,
            before
        })
    }

    render() {
        const { pinList } = this.props

        return (
            <div>
                <Helmet>
                    <title>沸点 - 掘金</title>
                </Helmet>
                <PinList list={pinList} />
                <Pullup loader={this._getPinList} />
            </div>
        )
    }
}
