import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import MobieTimePicker from '../views/mobie-time-picker.vue'
const mode = import.meta.env.VITE_ROUTER_HISTORY

const router = createRouter({
  history: mode == 'history' ? createWebHistory(import.meta.env.BASE_URL) : createWebHashHistory(),
  strict: true,
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
