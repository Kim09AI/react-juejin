import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Carousel from '../../components/carousel'
import './style.styl'

function Events(props) {
    const { eventList } = props

    return (
        <div styleName="events-wrapper">
            <Helmet>
                <title>掘金活动 - 帮助开发者发现更多面基机会</title>
            </Helmet>
            <Carousel>
                {
                    eventList.slice(0, 6).map(item => (
                        <a
                            href={item.eventUrl}
                            key={item._id}
                            styleName="item"
                            style={{ backgroundImage: `url(${item.screenshot})` }}
                        />
                    ))
                }
            </Carousel>
        </div>
    )
}

Events.propTypes = {
    eventList: PropTypes.array.isRequired
}

const mapState = state => ({
    eventList: state.events.eventList
})

export default connect(mapState)(Events)
