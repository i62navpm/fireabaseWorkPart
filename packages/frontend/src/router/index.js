import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/plugins/firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    beforeEnter(to, from, next) {
      auth.onAuthStateChanged((user) =>
        user ? next({ name: 'workforces' }) : next()
      )
    },
  },
  {
    path: '/workforces',
    component: () => import('@/views/Workforce.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('@/views/Worker.vue'),
        name: 'workforces',
      },
      {
        path: ':id',
        component: () => import('@/views/Home.vue'),
        name: 'workers',
      },
    ],
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
