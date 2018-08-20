import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './site/views/login.vue'
import proj from './site/views/ProjList.vue'
import main from './site/views/main.vue'
import crew from './site/views/CrewList.vue'
import wage from './site/views/WageList.vue'
import fine from './site/views/fineList.vue'
import operation from './site/views/OperationList.vue'
import worktable from './site/views/WorkTable.vue'

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
      path: '/wage',
      name: 'wage',
      component: wage,
    },{
      path: '/fine',
      name: 'fine',
      component: fine,
    },{
      path: '/operation',
      name: 'operation',
      component: operation,
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
