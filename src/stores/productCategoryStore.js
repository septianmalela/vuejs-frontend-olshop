import { defineStore } from 'pinia'
import api from '../lib/axios'

export const useProductCategoryStore = defineStore('product_categories', {
  state: () => ({
    productCategories: [],
    loading: false,
    loaded: false
  }),

  actions: {
    async fetchProductCategories() {
      if (this.loaded) {
        return
      }
      this.loading = true
      try {
        const response = await api.get('/product_categories')
        this.productCategories = response.data.product_categories
        this.loaded = true
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
