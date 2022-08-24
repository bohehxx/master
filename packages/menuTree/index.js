// 导入组件，组件必须声明 name
import MenuTree from './src/index.vue'

// 为组件提供 install 安装方法，供按需引入
MenuTree.install = function (Vue) {
  Vue.component(MenuTree.name, MenuTree)
}

// 默认导出组件
export default MenuTree