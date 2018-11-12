import qs from 'qs'

const timeFormatArr = [0, 60, 3600, 86400, 2592000, 31104000, Number.MAX_VALUE]
const timeUnit = ['刚刚', '分钟前', '小时前', '天前', '月前', '年前']

/**
 * 转换成相对时间
 * @param {string} dateStr
 */
export function timeFormat(dateStr) {
    // 先toString转成当前时区的时间再getTime
    const dateTime = new Date(new Date(dateStr).toString()).getTime()
    const now = new Date().getTime()
    let diff = (now - dateTime) / 1000

    const index = timeFormatArr.findIndex((item, i) => item <= diff && timeFormatArr[i + 1] > diff)

    if (index === 0) {
        return timeUnit[0]
    }

    diff = diff / timeFormatArr[index] | 0 // eslint-disable-line
    return diff + timeUnit[index]
}

export const getPostId = url => {
    if (!url) return ''

    return url.split('/').pop()
}

/* eslint-disable */
export function format(fmt, date) {
    date = date instanceof Date ? date : new Date(date)

    const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    return fmt
}
/* eslint-enable */

export const queryParse = search => {
    if (!search) return {}

    const _search = search.substr(1)
    const query = qs.parse(_search)
    return query
}

/**
 * 以str对多个字符串拼接
 * @param {string} str 拼接的表达式
 * @param {...string} args 拼接的n个字符串
 */
export const getComposeText = (str, ...args) => {
    const strs = args.reduce((res, item) => {
        item && res.push(item)
        return res
    }, [])

    return strs.join(str)
}

/**
 * 截取字符串，可以正确截取占4个字节的字符，不会乱码
 */
const maxCode = parseInt('0xFFFF', 16) // eslint-disable-line
export const substr = (str, start = 0, len = str.length) => {
    if (!str) return ''

    const end = start + len
    const code = str.codePointAt(end - 1)

    if (code > maxCode) {
        len += 1 // eslint-disable-line
    }

    return str.substr(start, len)
}
