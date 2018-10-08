import React from 'react'
import PropTypes from 'prop-types'
import { timeFormat } from '../../utils'
import './style.styl'

const colorConfig = {
    Lua: 'rgb(0, 0, 128)',
    Vue: 'rgb(44, 62, 80)',
    Javascript: 'rgb(241, 224, 90)',
    Kotlin: 'rgb(241, 142, 51)',
    R: 'rgb(25, 140, 231)',
    C: 'rgb(85, 85, 85)',
    Java: 'rgb(176, 114, 25)',
    PHP: 'rgb(79, 93, 149)',
    'C#': 'rgb(23, 134, 0)',
    default: 'rgb(194, 45, 64)'
}

export default function RepoList(props) {
    const { list } = props

    return (
        <ul styleName="repo-list">
            {
                list.map(item => (
                    <li key={item.objectId} styleName="item">
                        <a href={item.url} styleName="link">
                            <div styleName="name">{item.userName} / {item.repoName}</div>
                            <div styleName="desc">{item.description}</div>
                            <div styleName="info">
                                <div styleName="info-item">
                                    <i styleName="circle-icon" style={{ backgroundColor: colorConfig[item.language] || colorConfig.default }} />
                                    <span styleName="text">{item.language}</span>
                                </div>
                                <div styleName="info-item">
                                    <i className="iconfont" styleName="collect">&#xe632;</i>
                                    <span styleName="text">{item.stars}</span>
                                </div>
                                <div styleName="info-item">
                                    <i className="iconfont" styleName="fork">&#xe745;</i>
                                    <span styleName="text">{item.fork}</span>
                                </div>
                                <div styleName="update">{timeFormat(item.pushedAt)}更新</div>
                            </div>
                        </a>
                    </li>
                ))
            }
        </ul>
    )
}

RepoList.propTypes = {
    list: PropTypes.array.isRequired
}
