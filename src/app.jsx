import React from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import ProgressBar from './components/progressBar'

export default function App(props) {
    const { route } = props

    return (
        <div>
            <ProgressBar />
            {renderRoutes(route.routes)}
        </div>
    )
}

App.propTypes = {
    route: PropTypes.object.isRequired
}
