
import 'src/site/utils/polyfill'
import Vue from 'vue/dist/vue.js'
import App from 'src/site/containers/App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

// import css
import 'vue-easytable/libs/themes-base/index.css'

// import table and pagination comp
import {VTable,VPagination} from 'vue-easytable'

// Register to global
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

import 'src/site/styles/index.scss'

// eslint-disable-next-line
let vue = new Vue({ ...App, router, store }).$mount('#app');

Vue.directive('gear', {
  bind: function(el, binding, vnode) {
    let conf = store.state.global.page_config[binding.value];
    if (conf) {
      let props = JSON.parse(conf.props)
      for (let key in props) {
        vnode.componentInstance['remoteConfig'][key] = props[key];
      }
    } else {
      let nodeProps = vnode.componentInstance.$data.remoteConfig;
      let configList = [];
      for (let item in nodeProps) {
        let propType = typeof nodeProps[item]
        if(propType == 'number' || propType == 'string'){
          configList.push({title: item, type: propType})
        }
      }
      if(configList.length > 0){

        let params = {
          proj_id: store.state.global.current_proj.id,
          page_url: router.history.current.path,
          gear_id: binding.value,
          props: JSON.stringify({}),
          props_format: JSON.stringify(configList)
        };
        store.dispatch('updatePageConfigure', params)
      }
      // nodeProps['tableAttrs'] = ['姓名']
      // vnode.componentInstance.setConfig({tableAttrs: ['姓名']})
    }
  }
})


export default {
  vue
}
