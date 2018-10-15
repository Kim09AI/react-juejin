import React from 'react'
// import PropTypes from 'prop-types'
import Header from '../../components/header'
// import TabList from '../../components/tabList'
import './style.styl'

export default class User extends React.Component {
    state = {
        boundaryTop: 800
    }

    setBoundaryTop = (boundaryTop) => {
        this.setState({
            boundaryTop
        })
    }

    render() {
        const { boundaryTop } = this.state

        return (
            <div>
                <Header boundaryTop={boundaryTop} />
                {/* <TabList syncFixedTop={this.setBoundaryTop} tabList={[]} getLink={() => '/'} ref={tabList => { this.tabList = tabList }} /> */}
            </div>
        )
    }
}
