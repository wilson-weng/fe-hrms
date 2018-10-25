import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
import login from './site/views/login.vue'
import proj from './site/views/proj/projList.vue'
import main from './site/views/main.vue'
import crew from './site/views/crew/crewList.vue'
import crewDetail from './site/views/crew/crewDetail.vue'
import wage from './site/views/wage/wageList.vue'
import fine from './site/views/fine/fineList.vue'
import wxApply from './site/views/wxApplyList.vue'
import worktable from './site/views/workTable.vue'
import recruitEditor from './site/views/proj/recruitPageEditor.vue'
import mobile from './site/views/mobile.vue'
import projOffer from './site/views/proj/projOffer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: "/",
    name: "main",
    component: main,
    children: [{
      path: '/proj',
      name: 'proj',
      component: proj,
    },{
      path: '/worktable',
      name: 'worktable',
      component: worktable,
      meta: { projBar: true }
    },{
      path: '/crew',
      name: 'crew',
      component: crew,
      meta: { projBar: true }
    },{
      path: '/crew/detail',
      name: 'crewDetail',
      component: crewDetail,
      meta: { projBar: true }
    },{
      path: '/wage',
      name: 'wage',
      component: wage,
      meta: { projBar: true }
    },{
      path: '/fine',
      name: 'fine',
      component: fine,
      meta: { projBar: true }
    },{
      path: '/apply',
      name: 'wxApply',
      component: wxApply,
      meta: { projBar: true }
    },{
      path: '/offer',
      name: 'offer',
      component: projOffer,
      meta: { projBar: true }
    },{
      path: '/recruit/editor',
      name: 'recruitEditor',
      component: recruitEditor,
      meta: { projBar: true }
    }]
  },{
    path: '/mobile',
    name: 'mobile',
    component: mobile,
  },
  {
    path: '/logout',
    name: 'logout',
    redirect: '/login',
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes: routes,
})

// router.beforeEach((to, from, next) => {
  // let store = router.app.$options.store;
  // store.dispatch('getPageConfigure', {page_url: to.path}).then(()=>next());
// });

export default router
