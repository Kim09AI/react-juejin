import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.styl'

export default function TagList(props) {
    const { list, onFollowBtnClick } = props

    return (
        <ul styleName="tag-list">
            {
                list.map((item, index) => (
                    <li key={item.id} styleName="item">
                        <div styleName="icon" style={{ backgroundImage: `url(${item.icon})` }} />
                        <div styleName="title">{item.title}</div>
                        <span
                            styleName={classNames({ 'follow-btn': true, active: item.isSubscribe })}
                            onClick={() => onFollowBtnClick(item.id, index, !item.isSubscribe)}
                        >
                            {item.isSubscribe ? '已关注' : '关注'}
                        </span>
                    </li>
                ))
            }
        </ul>
    )
}

TagList.propTypes = {
    list: PropTypes.array.isRequired,
    onFollowBtnClick: PropTypes.func.isRequired
}
