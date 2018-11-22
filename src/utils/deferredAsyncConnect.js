import React from 'react'
import { asyncConnect } from 'redux-connect'

// 使用@loadable/component做代码分割的组件，不能直接作为asyncConnect(asyncItems)()的参数传入
// 需要封装成同步组件内
const dynamicComponentWrapper = (Component) => (props) => (
    <Component {...props} />
)

export const deferredAsyncConnect = Component => items => {
    const _items = Array.isArray(items) ? items : [items]

    const asyncItems = process.env.isClient
        ? _items.map(item => {
            const { promise, deferred } = item
            const newPromise = !deferred
                ? options => promise(options)
                : options => {
                    promise(options)
                }

            return { ...item, promise: newPromise }
        })
        : _items

    const newComponent = asyncConnect(asyncItems)(dynamicComponentWrapper(Component))
    return newComponent
}
