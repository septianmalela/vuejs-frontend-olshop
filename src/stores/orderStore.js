import { defineStore } from 'pinia'
import api from '@/lib/axios'
import { showToast } from '@/utils/toast'
import { useCartStore } from '@/stores/cartStore'

export const useOrderStore = defineStore('order', {
  state: () => ({
    loading: false,
    error: null,
  }),

  actions: {
    async createOrder() {
      this.loading = true
      this.error   = null

      try {
        const response = await api.post('/user/create_order')

        showToast('Order berhasil dibuat!', 'success')

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Failed to create order'
        showToast(this.error, 'danger')
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
