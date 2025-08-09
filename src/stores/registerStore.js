import { defineStore } from 'pinia'
import api from '@/lib/axios'
import { showToast } from '../utils/toast'

export const useRegisterStore = defineStore('register', {
  state: () => ({
    loading: false
  }),

  actions: {
    async register(payload) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/register', payload)
        return response.data
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || 'Register failed'
        this.error     = errorMsg
        showToast(errorMsg, 'danger')
        throw this.error
      } finally {
        this.loading = false
      }
    }
  }
})
