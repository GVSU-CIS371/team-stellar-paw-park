import { createRouter, createWebHistory } from 'vue-router'
import homepage from '../views/homepage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homepage,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about.vue'),
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('../views/schedule.vue'),
    },
    {
      path: '/userLogin',
      name: 'userLogin',
      component: () => import('../views/userLogin.vue'),
    },
    {
      path: '/userPage',
      name: 'userPage',
      component: () => import('../views/userPage.vue'),
    }
  ],
})

export default router
