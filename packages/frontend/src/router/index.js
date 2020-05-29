import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/plugins/firebase/auth'

import workforces from './workforces'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    beforeEnter(to, from, next) {
      auth.onAuthStateChanged((user) =>
        user ? next({ name: 'workforce' }) : next()
      )
    },
  },
  ...workforces,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    auth.onAuthStateChanged((user) => (user ? next() : next({ name: 'Home' })))
  } else {
    return next()
  }
})

export default router
