import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/layout',
    name:'layout',
    component: () => import('../views/home/home.vue'),
    redirect:'/index',
    meta:{
      title:'layout'
    },
    children:[
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/home/index.vue'),
        meta:{
          title:'首页'
        },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
