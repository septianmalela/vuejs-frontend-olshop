import { computed } from 'vue'
import { defineStore } from 'pinia'
import api from '../lib/axios'
import { showToast } from '../utils/toast'
import { useCartStore } from '@/stores/cartStore'
import { formatRupiah } from '@/utils/currency'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const response = await api.get('/products')

        this.products = response.data.products.map(product => ({
          ...product,
          qty: 1
        }))
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        this.loading = false
      }
    },

    incrementQty(productId) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        if (product.qty < product.stock) {
          product.qty++
        } else {
          showToast(`Stok ${product.name} sudah maksimal`, 'warning')
        }
      }
    },

    decrementQty(productId) {
      const product = this.products.find(p => p.id === productId)

      if (product && product.qty > 1) {
        product.qty--
      }
    },

    setQty(productId, value) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        const qty   = parseInt(value, 10)
        product.qty = isNaN(qty) || qty < 1 ? 1 : qty
      }
    },

    addToCart(productId) {
      const product = this.products.find(p => p.id === productId)

      if (!product) {
        showToast('Barang tidak ada!', 'danger')
        return
      }

      if (product.qty > product.stock) {
        showToast(`Stok ${product.name} tidak cukup`, 'warning')
        return
      }

      // Kirim ke backend
      api.post('/user/add_to_cart', {
        product_id: product.id,
        qty: product.qty
      })
        .then((response) => {
          const cartStore = useCartStore()
          cartStore.fetchCart()
          const totalPrice = computed(() => {
            return cartStore.cart.total_price
          })
          showToast(`${product.name} berhasil ditambahkan`, 'success')
        })
        .catch(err => {
          showToast(err.response.data.message, 'danger')
        })
    }
  }
})
