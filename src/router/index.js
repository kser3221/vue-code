import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/grp',
    name: 'Group',
    component: () => import('../views/Group.vue')
  },
  {
    path: '/alm',
    name: 'Alarm',
    component: () => import('../views/Alarm.vue')
  },
  {
    path: '/mng',
    name: 'MngSet',
    component: () => import('../views/Mng.vue'),
  },
  {
    path: '/batch',
    name: 'Batch',
    component: () => import('../views/Batch.vue')
  },
  {
    path: '/lock',
    name: 'Lock',
    component: () => import('../views/Lock.vue')
  },
  {
    path: '/log',
    name: 'Log',
    component: () => import('../views/Log.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
