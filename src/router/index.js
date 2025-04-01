import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import MobieTimePicker from '../views/mobie-demo.vue'
const mode = import.meta.env.VITE_ROUTER_HISTORY

const router = createRouter({
  history: mode == 'history' ? createWebHistory(import.meta.env.BASE_URL) : createWebHashHistory(),
  strict: true,
  routes: [
    {
      path: '/',
      redirect: '/web-demo',
      children: [
        {
          path: 'web-demo',
          name: 'WebDemo',
          component: () => import('../views/web-demo.vue'),
        },
        {
          path: 'mobie-demo',
          name: 'MobieDemo',
          component: MobieTimePicker,
        },
      ]
    }
  ],
})

export default router
