import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

export const user = {
    state: {
        isLogin: false,
        token: '',
        clientId: '',
        uid: '',
        userDetail: {},
        otherUserDetail: {}
    },
    reducers: {
        saveUserMessage(state, payload) {
            return {
                ...state,
                ...payload,
                isLogin: true
            }
        },
        setOtherUserDetail(state, { otherUserDetail }) {
            return {
                ...state,
                otherUserDetail
            }
        }
    },
    effects: {
        async loginByPhoneNumber({ phoneNumber, password } = {}, { api }) {
            try {
                const { data } = await api.loginByPhoneNumber(phoneNumber, password)

                const userInfo = {
                    token: data.token,
                    clientId: data.clientId,
                    uid: data.user.uid
                }
                Cookies.set('userInfo', userInfo, { expires: 7, path: '/' })
            } catch (err) {
                console.log(err)

                if (err.response.status === 401) {
                    toast.error('手机号或密码错误')
                } else {
                    toast.error('未知错误，请稍候重试')
                }

                // 抛出错误以便promise链式调用时，根据不同状态执行相应操作
                throw err
            }
        },
        /**
         * 服务端渲染同步用户数据，仅在服务端渲染时调用
         */
        async syncUserDetailForSSR({ token, clientId, uid } = {}, { api }) {
            try {
                const { data } = await api.getUserInfo(uid)
                this.saveUserMessage({ token, clientId, uid, userDetail: data.d })
            } catch (err) {
                console.log(err)
            }
        },
        async getOtherUserDetail({ userId }, { api, user }) {
            if (user.uid === userId) {
                return
            }

            try {
                const { data } = await api.getOtherUserInfo(userId)
                this.setOtherUserDetail({
                    otherUserDetail:
                    data.d[userId]
                })
            } catch (err) {
                console.log(err)
            }
        },
        logout() {
            Cookies.remove('userInfo')
            window.location.reload()
        }
    }
}
