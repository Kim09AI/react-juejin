import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './style.styl'

export default function BookList(props) {
    const { list } = props

    return (
        <ul styleName="book-list">
            {
                list.map(item => (
                    <li key={item.id} styleName="item">
                        <Link to={`/book/${item.id}`} styleName="link">
                            <div styleName="icon-wrapper" style={{ backgroundImage: `url(${item.img})` }} />
                            <div styleName="content">
                                <div styleName="title">{item.title}</div>
                                <div styleName="author">
                                    <span styleName="username">{item.userData.username}</span>
                                </div>
                                <div styleName="book-info">
                                    <span>{item.lastSectionCount}小节</span>
                                    <span styleName="circle">·</span>
                                    <span>{item.buyCount}人已购买</span>
                                </div>
                            </div>
                            <div styleName="right-box">
                                <div styleName="price">&yen; {item.price}</div>
                            </div>
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}

BookList.propTypes = {
    list: PropTypes.array.isRequired
}
