import { createRouter, createWebHistory } from 'vue-router'
import MobieTimePicker from '../views/mobie-time-picker.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/web',
      children: [
        {
          path: 'web',
          name: 'WebTimePicker',
          component: () => import('../views/web-time-picker.vue'),
        },
        {
          path: 'mobie',
          name: 'MobieTimePicker',
          component: MobieTimePicker,
        },
      ]
    }
  ],
})

export default router
