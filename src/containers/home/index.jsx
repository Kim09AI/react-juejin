import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EntryList from '../../components/entryList'
import Pullup from '../../components/pullup'
import './style.styl'

const mapState = state => ({
    entryList: state.home.entryList
})

const mapDispatch = ({ home: { getEntryList } }) => ({
    getEntryList
})

@connect(mapState, mapDispatch)
export default class Home extends React.Component {
    static propTypes = {
        entryList: PropTypes.array.isRequired,
        getEntryList: PropTypes.func.isRequired
    }

    _getEntryList = () => {
        const { entryList, getEntryList } = this.props
        const before = entryList[entryList.length - 1] && entryList[entryList.length - 1].rankIndex

        return getEntryList({ before, more: true })
    }

    render() {
        const { entryList } = this.props

        return (
            <div className="main">
                <div styleName="category">
                    <h3 styleName="title">热门文章</h3>
                    <span styleName="more">查看更多</span>
                </div>
                <EntryList entryList={entryList} />
                <Pullup loader={this._getEntryList} />
            </div>
        )
    }
}
