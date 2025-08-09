import { defineStore } from 'pinia'
import api from '@/lib/axios'
import { showToast } from '../utils/toast'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: {
      cart_items: [],
      total_price: 0
    },
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCart() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/user/carts')

        this.cart = {
          cart_items: response.data.cart?.cart_items || [],
          total_price: response.data.cart?.total_price || 0,
        }
      } catch (err) {
        const errorMsg = err.message || 'Failed to load cart'
        showToast(errorMsg, 'danger')
        this.error = errorMsg
      } finally {
        this.loading = false
      }
    }
  }
})
