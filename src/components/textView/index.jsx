import React from 'react'
import PropTypes from 'prop-types'
import { substr } from '../../utils'
import './style.styl'

const linkPattern = /((http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w\u4e00-\u9fa5\-./?@%!&=+~:#;,]*)?)/ig

function getLinkContent(content) {
    const pos = []
    let diffLen = 0

    const newContent = content.replace(linkPattern, (url, ...args) => {
        // 获取在newContent中的开始下标
        const index = args[args.length - 2] + diffLen
        const link = `<a href="${url}">网页链接</a>`

        // 记录链接在newContent中出现的开始和结束的下标
        pos.push({
            start: index,
            end: index + link.length
        })

        diffLen += link.length - url.length

        return link
    })

    return {
        content: newContent,
        pos
    }
}

function getSubContent(includeLink, linkData, originContent, subLen) {
    if (!includeLink) {
        return substr(originContent, 0, subLen)
    }

    const { content, pos } = linkData
    let newSubLen = subLen
    pos.some(({ start, end }) => {
        // 截取的字符串不包含当前链接
        if (newSubLen <= start) {
            return true
        }

        // 截取的位置包含该链接
        newSubLen += end - start
        return false
    })

    return substr(content, 0, newSubLen)
}

export default class TextView extends React.PureComponent {
    static defaultProps = {
        content: '',
        subLen: 100
    }

    static propTypes = {
        content: PropTypes.string,
        subLen: PropTypes.number, // eslint-disable-line
    }

    state = {
        show: false,
        includeLink: false,
        linkData: {},
        subContent: '',
        content: '',
        subLen: 100
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.content !== prevState.content || nextProps.subLen !== prevState.subLen) {
            const includeLink = nextProps.content.match(linkPattern)
            const linkData = includeLink ? getLinkContent(nextProps.content) : {}

            return {
                includeLink,
                linkData,
                subContent: getSubContent(includeLink, linkData, nextProps.content, nextProps.subLen),
                content: nextProps.content,
                subLen: nextProps.subLen
            }
        }

        return null
    }

    getFullContent() {
        return this.state.includeLink ? this.state.linkData.content : this.props.content
    }

    toggleText = () => {
        this.setState(prevState => ({
            show: !prevState.show
        }))
    }

    render() {
        const { content } = this.props
        const { show, includeLink, subContent } = this.state

        if (!content) return null

        return (
            <div>
                {
                    includeLink
                        ? <div styleName="text" dangerouslySetInnerHTML={{ __html: show ? this.getFullContent() : subContent }} />
                        : <div styleName="text">{show ? this.getFullContent() : subContent}</div>
                }
                {
                    this.getFullContent().length > subContent.length && (
                        <div styleName="btn-box">
                            <span styleName="text-btn" onClick={this.toggleText}>{show ? '收起' : '展开'}</span>
                        </div>
                    )
                }
            </div>
        )
    }
}
