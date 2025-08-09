import { defineStore } from 'pinia'
import api from '../lib/axios'

export const useProductCategoryStore = defineStore('product_categories', {
  state: () => ({
    productCategories: [],
    loading: false
  }),
  actions: {
    async fetchProductCategories() {
      this.loading = true
      try {
        const response         = await api.get('/product_categories')
        this.productCategories = response.data.product_categories
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
