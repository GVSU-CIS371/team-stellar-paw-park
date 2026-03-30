import { createRouter, createWebHistory } from 'vue-router'
import homepage from '../views/homepage.vue'
import about from '../views/about.vue'
import schedule from '../views/schedule.vue'
import userLogin from '../views/userLogin.vue'
import userPage from '../views/userPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homepage,
    },
    {
      path: '/about',
      name: 'about',
      component: about,
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: schedule,
    },
    {
      path: '/userLogin',
      name: 'userLogin',
      component: userLogin,
    },
    {
      path: '/userPage',
      name: 'userPage',
      component: userPage,
    }
  ],
})

export default router
