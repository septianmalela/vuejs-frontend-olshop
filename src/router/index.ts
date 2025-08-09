import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { showToast } from '@/utils/toast'

import UserLayout from '@/layouts/UserLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Order from '@/pages/Order.vue'

const routes = [
  {
    path: '/',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/orders',
        name: 'Order',
        component: Order,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const publicPages = ['/login', '/register']
  const authRequired = to.meta.requiresAuth

  if (publicPages.includes(to.path) && authStore.isAuthenticated) {
    showToast('Anda sudah login, tidak dapat akses page tersebut!', 'danger')
    return next('/')
  }

  if (authRequired && !authStore.isAuthenticated) {
    showToast('Anda harus login dulu untuk mengakses halaman ini.', 'warning')
    return next('/login')
  }

  next()
})

export default router
