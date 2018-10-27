import React from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'
import './style.styl'

export default class ImgView extends React.Component {
    static defaultProps = {
        scale: 1000, // 控制图片宽度的比例尺
    }

    static propTypes = {
        list: PropTypes.array.isRequired,
        scale: PropTypes.number
    }

    constructor(props) {
        super(props)
        this.state = {
            imgList: this.formatImg(props.list, props.scale)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.list !== this.props.list || nextProps.scale !== this.props.scale) {
            this.setState({
                imgList: this.formatImg(nextProps.list, nextProps.scale)
            })
        }
    }

    formatImg(list, scale) {
        return list.map(url => {
            const index = url.indexOf('?')
            const { w, h } = qs.parse(url.substr(index + 1))

            return {
                w: parseInt(w / scale * 100, 10),
                h,
                url,
                imgScale: Math.min(parseInt(h / w * 100, 10), 180)
            }
        })
    }

    render() {
        const { imgList } = this.state

        return (
            <ul styleName="img-list">
                {
                    imgList.map(item => (
                        <li key={item.url} styleName="item" style={{ width: `${item.w}%` }}>
                            <div styleName="img" style={{ backgroundImage: `url(${item.url})`, width: '100%', paddingTop: `${item.imgScale}%` }} />
                        </li>
                    ))
                }
            </ul>
        )
    }
}
