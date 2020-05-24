import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/plugins/firebase/auth'
import Home from '@/views/Home.vue'
import A from '@/views/A.vue'
import B from '@/views/B.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      auth.onAuthStateChanged((user) =>
        user ? next({ name: 'Workforces' }) : next()
      )
    },
  },
  {
    path: '/workforces',
    name: 'Workforces',
    component: A,
    meta: { requiresAuth: true },
  },
  {
    path: '/workers',
    name: 'Workers',
    component: B,
    meta: { requiresAuth: true },
  },
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
