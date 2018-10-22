import React from 'react'
import PropTypes from 'prop-types'
import './style.styl'

export default function EmptyContentTip({ tip }) {
    return (
        <div styleName="empty-content">
            <i className="iconfont" styleName="content-icon">&#xe60c;</i>
            <div styleName="tip">{tip}</div>
        </div>
    )
}

EmptyContentTip.defaultProps = {
    tip: '这里什么都没有'
}

EmptyContentTip.propTypes = {
    tip: PropTypes.string
}
