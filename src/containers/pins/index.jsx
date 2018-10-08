import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PinList from '../../components/pinList'
import './style.styl'

const mapState = state => ({
    pinList: state.pins.pinList
})

@connect(mapState)
export default class Pins extends React.Component {
    static propTypes = {
        pinList: PropTypes.array.isRequired
    }

    componentDidMount() {}

    render() {
        const { pinList } = this.props

        return (
            <div>
                <PinList list={pinList} />
            </div>
        )
    }
}
