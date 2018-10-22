const hostConfig = {
    timeline: 'https://timeline-merger-ms.juejin.im/v1',
    xiaoce: 'https://xiaoce-timeline-api-ms.juejin.im/v1',
    repo: 'https://repo-ms.juejin.im/v1',
    shortMsg: 'https://short-msg-ms.juejin.im/v1',
    post: 'https://post-storage-api-ms.juejin.im/v1',
    comment: 'https://comment-wrapper-ms.juejin.im/v1',
    juejin: 'https://juejin.im',
    user: 'https://user-storage-api-ms.juejin.im/v1',
    like: 'https://user-like-wrapper-ms.juejin.im/v1',
    ufp: 'https://ufp-api-ms.juejin.im/v1',
    gold: 'https://gold-tag-ms.juejin.im/v1',
    lccro: 'https://lccro-api-ms.juejin.im/v1',
    follow: 'https://follow-api-ms.juejin.im/v1',
    event: 'https://event-storage-api-ms.juejin.im/v1'
}

exports.proxyOptions = {
    target: 'https://juejin.im',
    changeOrigin: true,
    pathRewrite: {
        '^/api/timeline': '/',
        '^/api/xiaoce': '/',
        '^/api/repo': '/',
        '^/api/shortMsg': '/',
        '^/api/post': '/',
        '^/api/comment': '/',
        '^/api/juejin': '/',
        '^/api/user': '/',
        '^/api/like': '/',
        '^/api/ufp': '/',
        '^/api/gold': '/',
        '^/api/lccro': '/',
        '^/api/follow': '/',
        '^/api/event': '/'
    },
    router({ url }) {
        const prefix = url.split('/')[2]

        return hostConfig[prefix]
    }
}
