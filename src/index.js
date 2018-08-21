import 'src/site/styles/index.scss'
import 'src/site/utils/polyfill'
import Vue from 'vue'
import App from 'src/site/containers/App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './site/styles/index.scss';


Vue.use(ElementUI)
// eslint-disable-next-line
new Vue({ ...App, router, store }).$mount('#app')
