import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './site/views/login.vue'
import proj from './site/views/projList.vue'
import main from './site/views/main.vue'
import crew from './site/views/crewList.vue'
import crewDetail from './site/views/crewDetail.vue'
import wage from './site/views/wageList.vue'
import fine from './site/views/fineList.vue'
import wxApply from './site/views/wxApplyList.vue'
import worktable from './site/views/workTable.vue'
import recruitEditor from './site/views/recruitPageEditor.vue'
import mobile from './site/views/mobile.vue'

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
      path: '/worktable',
      name: 'worktable',
      component: worktable,
    },{
      path: '/proj',
      name: 'proj',
      component: proj,
    },{
      path: '/crew',
      name: 'crew',
      component: crew,
    },{
      path: '/crew/detail',
      name: 'crewDetail',
      component: crewDetail,
    },{
      path: '/wage',
      name: 'wage',
      component: wage,
    },{
      path: '/fine',
      name: 'fine',
      component: fine,
    },{
      path: '/apply',
      name: 'wxApply',
      component: wxApply,
    },{
      path: '/recruit/editor',
      name: 'recruitEditor',
      component: recruitEditor,
    },{
      path: '/mobile',
      name: 'mobile',
      component: mobile,
    }]
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

export default router
