import React from 'react'
import PropTypes from 'prop-types'
import './style.styl'

const linkPattern = /(((http|https):\/\/)([\w-]+\.)+[\w-]+(\/[\w\u4e00-\u9fa5\-./?@%!&=+~:#;,]*)?)/ig

export default class TextView extends React.Component {
    static defaultProps = {
        content: '',
        subLen: 100
    }

    static propTypes = {
        content: PropTypes.string,
        subLen: PropTypes.number
    }

    constructor(props) {
        super(props)

        const { content } = props
        const includeLink = !!content.match(linkPattern)
        const linkData = includeLink ? this.getLinkContent(content) : {}

        this.state = {
            show: false,
            includeLink,
            linkData,
            subContent: this.getSubContent(includeLink, linkData, props.content, props.subLen)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.content !== this.props.content || nextProps.subLen !== this.props.subLen) {
            const includeLink = nextProps.content.match(linkPattern)
            const linkData = includeLink ? this.getLinkContent(nextProps.content) : {}

            this.setState({
                includeLink,
                linkData,
                subContent: this.getSubContent(includeLink, linkData, nextProps.content, nextProps.subLen)
            })
        }
    }

    getFullContent() {
        return this.state.includeLink ? this.state.linkData.content : this.props.content
    }

    getSubContent(includeLink, linkData, originContent, subLen) {
        if (!includeLink) {
            return originContent.substr(0, subLen)
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

        return content.substr(0, newSubLen)
    }

    getLinkContent(content) {
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
