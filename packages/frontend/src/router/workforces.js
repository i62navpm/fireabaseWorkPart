export default [
  {
    path: '/workforces',
    component: () => import('@/views/Workforce.vue'),
    name: 'workforce',
    meta: { requiresAuth: true },
    children: [
      {
        path: ':id/:year/:month',
        component: () => import('@/views/Worker.vue'),
        name: 'worker',
        redirect: { name: 'calendar' },
        children: [
          {
            path: '',
            component: () => import('@/components/TheWorkerCalendar.vue'),
            name: 'calendar',
          },
          {
            path: 'summary',
            component: () => import('@/components/TheWorkerSummary.vue'),
            name: 'summary',
          },
        ],
      },
    ],
  },
]
