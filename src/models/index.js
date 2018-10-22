// 导入所有当前目录下以export导出的model
const requireAll = requireContext => requireContext.keys().map(requireContext)
const res = require.context('./', true, /^(?!\.\/index).*\.js$/)
const models = requireAll(res).reduce((_models, module) => Object.assign(_models, module), {})

models.default && delete models.default

export default models
