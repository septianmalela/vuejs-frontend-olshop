import { defineStore } from 'pinia'
import api from '@/lib/axios'
import { useAuthStore } from './authStore'
import { showToast } from '../utils/toast'

export const useLoginStore = defineStore('login', {
  state: () => ({
    loading: false,
    error: null,
  }),

  actions: {
    async login(payload) {
      this.loading    = true
      this.error      = null
      const authStore = useAuthStore()

      try {
        const response                = await api.post('/login', payload)
        const { user, authorisation } = response.data

        await authStore.setUserAndToken(user, authorisation)

        return response.data
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || 'Login failed'
        this.error     = errorMsg
        showToast(errorMsg, 'danger')
        throw this.error
      } finally {
        this.loading = false
      }
    }
  }
})
