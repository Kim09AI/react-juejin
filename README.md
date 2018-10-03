# react-rematch-ssr
> 前言：`react-rematch-ssr`是在之前搭建的[react-ssr-template](https://github.com/Kim09AI/react-ssr-template)基础上做的优化，之前在做技术选型的时候选择了`redux`和`redux-saga`，后来觉得过于繁琐，之后了解到`rematch`，就用`rematch`做了优化，使用更简单、高效！

## 运行
```
yarn or npm install

# development
npm run dev:client
npm run dev:server

# production
npm run build
npm start
```

## 主要优化
- 状态管理由`redux`和`redux-saga`替换成`rematch`
- 页面初始数据获取由`react-async-bootstrapper`替换成`redux-connect`
- 服务端渲染cookie共享
- 使用husky和lint-staged规范提交的代码
- 优化开发环境下获取服务端bundle逻辑，简化路由配置
