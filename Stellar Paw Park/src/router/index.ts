import { createRouter, createWebHistory } from 'vue-router'
import homepage from '../views/homepage.vue'
import about from '../views/about.vue'
import booking from '../views/booking.vue'
import contactUs from '../views/contactUs.vue'
import userLogin from '../views/userLogin.vue'
import userPage from '../views/userPage.vue'
import admin from '../views/admin.vue'

const router = createRouter({
  history: createWebHistory("/team-stellar-paw-park/"),
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
      path: '/booking',
      name: 'booking',
      component: booking,
    },
    {
      path: '/contactUs',
      name: 'contactUs',
      component: contactUs,
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
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
    }
  ],
})

export default router
