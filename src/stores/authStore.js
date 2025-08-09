import { defineStore } from 'pinia'
import api from '@/lib/axios'
import router from '@/router'
import { showToast } from '../utils/toast'

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
      this.user  = JSON.stringify(user)
      this.token = authorisation.token

      localStorage.setItem('auth_token', authorisation.token)
      localStorage.setItem('auth_user', this.user)

      api.defaults.headers.common['Authorization'] = `Bearer ${authorisation.token}`

      router.push('/')
    },
    logout() {
      this.user  = null
      this.token = null

      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      delete api.defaults.headers.common['Authorization']

      showToast('Anda telah logout')
      router.push('/')
    },
    loadFromLocalStorage() {
      const token = localStorage.getItem('auth_token')
      const user  = localStorage.getItem('auth_user')

      if (token && user) {
        this.token = token
        this.user  = user
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    },

    // async fetchUser() {
    //   try {
    //     const response = await api.get('/user')
    //     this.user = response.data.user
    //   } catch (error) {
    //     console.error('Gagal fetch user profile:', error)
    //     this.logout()
    //   }
    // }
  }
})
