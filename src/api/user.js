export default hostConfig => ({
    // 手机登录
    loginByPhoneNumber(phoneNumber, password) {
        return this.post(`${hostConfig.juejin}/auth/type/phoneNumber`, {
            phoneNumber,
            password
        })
    },

    // 获取用户信息详情
    getUserInfo(currentUid) {
        return this.get(`${hostConfig.user}/getUserInfo`, {
            params: {
                src: 'web',
                current_uid: currentUid
            }
        })
    }
})
