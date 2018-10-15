import { hostConfig } from './config'

export default {
    // 获取小册分类
    getNavList() {
        return this.get(`${hostConfig.xiaoce}/getNavList`)
    },

    // 获取手册
    getListByLastTime(pageNum = 1, alias) {
        return this.get(`${hostConfig.xiaoce}/getListByLastTime`, {
            params: {
                src: 'web',
                pageNum,
                alias
            }
        })
    }
}
