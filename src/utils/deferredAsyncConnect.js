import { asyncConnect } from 'redux-connect'

export const deferredAsyncConnect = Component => items => {
    const _items = Array.isArray(items) ? items : [items]
    const asyncItems = process.env.isClient
        ? _items.map(item => {
            const { promise, deferred } = item
            const newPromise = !deferred
                ? async options => Promise.all([
                    Component.preload && await Component.preload(),
                    promise(options)
                ]).then(res => res[1])
                : async options => {
                    Component.preload && await Component.preload()
                    promise(options)
                }

            return { ...item, promise: newPromise }
        })
        : _items

    const newComponent = asyncConnect(asyncItems)(Component)
    if (process.env.isClient && Component.preload) {
        // 把异步组件preload的赋值给newComponent，方便预加载组件
        newComponent.preload = Component.preload
    }
    return newComponent
}
