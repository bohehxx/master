import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'msmp-comp3/lib/msmp-comp3.css'
Vue.use(ElementUI)
// 导入组件库
import msmp from 'msmp-comp3'
// 注册组件库
Vue.use(msmp)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
