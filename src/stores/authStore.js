import { defineStore } from 'pinia'
import api from '@/lib/axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),

  actions: {
    setUserAndToken(user, authorisation) {
      this.user  = user
      this.token = authorisation.token

      localStorage.setItem('auth_token', authorisation.token)

      api.defaults.headers.common['Authorization'] = `Bearer ${authorisation.token}`

      router.push('/')
    },

    logout() {
      this.user  = null
      this.token = null

      localStorage.removeItem('auth_token')
      router.push('/login')
    },

    loadFromLocalStorage() {
      const token = localStorage.getItem('auth_token')
      if (token) {
        this.token = token
      }
    }
  }
})
