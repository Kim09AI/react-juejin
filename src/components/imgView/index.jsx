import React from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'
import './style.styl'

/**
 * 解析图片url中的图片大小
 * @param {array} list 图片列表
 * @param {number} baseWidth 计算图片所占宽度百分比的基准宽度
 * @returns {array} 格式化后的新列表
 */
function formatImg(list, baseWidth) {
    return list.map(url => {
        const index = url.indexOf('?')
        const { w, h } = qs.parse(url.substr(index + 1))

        return {
            w: parseInt(w / baseWidth * 100, 10),
            h,
            url,
            imgScale: Math.min(parseInt(h / w * 100, 10), 180)
        }
    })
}

export default class ImgView extends React.Component {
    static defaultProps = {
        baseWidth: 1000, // 计算图片所占宽度百分比的基准宽度
    }

    static propTypes = {
        list: PropTypes.array.isRequired, // eslint-disable-line
        baseWidth: PropTypes.number, // eslint-disable-line
    }

    state = {
        imgList: [],
        list: [],
        baseWidth: 1000
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.list !== prevState.list || nextProps.baseWidth !== prevState.baseWidth) {
            return {
                imgList: formatImg(nextProps.list, nextProps.baseWidth),
                list: nextProps.list,
                baseWidth: nextProps.baseWidth
            }
        }

        return null
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
