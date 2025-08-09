import { defineStore } from 'pinia'
import api from '@/lib/axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setUserAndToken(user, authorisation) {
      this.user = user
      this.token = authorisation.token

      localStorage.setItem('auth_token', authorisation.token)

      api.defaults.headers.common['Authorization'] = `Bearer ${authorisation.token}`

      router.push('/')
    },

    logout() {
      this.user = null
      this.token = null

      localStorage.removeItem('auth_token')
      delete api.defaults.headers.common['Authorization']

      router.push('/login')
    },

    loadFromLocalStorage() {
      const token = localStorage.getItem('auth_token')
      if (token) {
        this.token = token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    },

    // async fetchUser() {
    //   try {
    //     const response = await api.get('/user')  // endpoint profile user, sesuaikan ya
    //     this.user = response.data.user
    //   } catch (error) {
    //     console.error('Gagal fetch user profile:', error)
    //     this.logout()  // Kalau token invalid, logout saja
    //   }
    // }
  }
})
