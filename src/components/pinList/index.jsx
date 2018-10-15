import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import ImgView from '../imgView'
import TextView from '../textView'
import { timeFormat } from '../../utils'
import './style.styl'

export default function PinList(props) {
    const { list } = props

    return (
        <ul styleName="pin-list">
            {
                list.map(item => (
                    <li key={item.objectId} styleName="item">
                        <div styleName="header">
                            <Link to={`/user/${item.uid}`} styleName="avatar-box">
                                <div styleName="avatar" style={{ backgroundImage: `url(${item.user.avatarLarge})` }} />
                            </Link>
                            <div styleName="user-info">
                                <div>
                                    <Link to={`/user/${item.uid}`} styleName="name">{item.user.username}</Link>
                                </div>
                                <div styleName="pos">
                                    <span styleName="time">{timeFormat(item.createdAt)}</span>
                                </div>
                            </div>
                            <div>
                                <i className="iconfont" styleName="more-action">&#xe675;</i>
                            </div>
                        </div>
                        <div styleName="body">
                            <TextView content={item.content} />
                        </div>
                        {
                            item.pictures.length > 0 && (
                                <div styleName="img-wrapper">
                                    <LazyLoad once height="100">
                                        <ImgView list={item.pictures} />
                                    </LazyLoad>
                                </div>
                            )
                        }
                        {
                            !!item.topic && (
                                <div styleName="tag-wrapper">
                                    <span styleName="tag">{item.topic.title}</span>
                                </div>
                            )
                        }
                        <div styleName="footer">
                            <div styleName="action">
                                <i className="iconfont">&#xe600;</i>
                                {item.likedCount > 0 && <span>{item.likedCount}</span>}
                            </div>
                            <div styleName="action">
                                <i className="iconfont" styleName="comment-icon">&#xe662;</i>
                                <span>{item.commentCount > 0 ? item.commentCount : '评论'}</span>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

PinList.propTypes = {
    list: PropTypes.array.isRequired
}
