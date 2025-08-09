<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/tks.png" alt="Bootstrap" width="50" height="50">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="mx-auto row g-2" role="search" style="max-width: 600px; width: 100%;">
          <div class="col-12 col-md-auto" style="flex: 0 0 auto; width: 200px;">
            <select class="form-select w-100" v-if="!productCategoryStore.loading" v-model="productStore.productCategoryId">
              <option :value="null" selected>All Categories</option>
              <option v-for="product_category in productCategoryStore.productCategories" :key="product_category.id" :value="product_category.id">
                {{ product_category.name }}
              </option>
            </select>
            <div v-else>Loading...</div>
          </div>
          <div class="col-12 col-md">
            <div class="search-wrapper position-relative">
              <input v-model="productStore.searchName" class="form-control pe-5" type="search" placeholder="Search for more than 20,000 products" aria-label="Search"/>
              <i class="bi bi-search position-absolute" style="right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none;"></i>
            </div>
          </div>
        </form>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li v-if="authStore.isAuthenticated" class="nav-item">
            <a href="javascript:;" class="nav-link" @click.prevent="authStore.logout()">Logout</a>
          </li>
          <li v-if="!authStore.isAuthenticated" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex flex-column align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="min-width: 120px;">
              <div class="d-flex align-items-center">
                <i class="bi bi-person-fill mx-2"></i>
                <span>Hi, Selamat Datang!</span>
              </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link to="/login" class="dropdown-item">Login</router-link>
              </li>
              <li>
                <router-link to="/register" class="dropdown-item">Register</router-link>
              </li>
            </ul>
          </li>
          <li v-else class="nav-item">
            <a class="nav-link d-flex flex-column align-items-center" href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart" style="min-width: 120px;">
              <div class="d-flex align-items-center">
                <i class="bi bi-person-fill mx-2"></i>
                <span>Hi, {{ userObj.name }}</span>
              </div>
              <small>{{ formatRupiah(totalPrice) }}</small>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
    <div class="offcanvas-header">
      <h5 id="offcanvasCartLabel">Your Cart ({{ cartItems.length }})</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div v-if="cartItems.length === 0">
        <p>Your cart is empty.</p>
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
          <div>
            <strong>{{ item.name }}</strong><br />
            Qty: {{ item.qty }} x {{ formatRupiah(item.price) }}
          </div>
          <div>
            {{ formatRupiah(item.qty * item.price) }}
          </div>
        </div>
        <div class="d-flex justify-content-between fw-bold">
          <span>Total:</span>
          <span>{{ formatRupiah(totalPrice) }}</span>
        </div>
        <button class="btn btn-warning w-100 mt-4">Continue to checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, computed, watch, ref } from 'vue'
  import { useAuthStore } from '@/stores/authStore'
  import { useProductCategoryStore } from '@/stores/productCategoryStore'
  import { useProductStore } from '@/stores/productStore'
  import { useCartStore } from '@/stores/cartStore'
  import { useRouter } from 'vue-router'
  import { formatRupiah } from '@/utils/currency'

  const productCategoryStore = useProductCategoryStore()
  const productStore         = useProductStore()
  const authStore            = useAuthStore()
  const router               = useRouter()
  const cartStore            = useCartStore()

  const userObj   = authStore.user ? JSON.parse(authStore.user) : null

  onMounted(() => {
    if (authStore.isAuthenticated) {
      cartStore.fetchCart()
    }
    productCategoryStore.fetchProductCategories()
  })

  const cartItems  = computed(() => authStore.isAuthenticated ? cartStore.cart.cart_items : [])
  const totalPrice = computed(() => authStore.isAuthenticated ? cartStore.cart.total_price : 0)

  watch(
    () => [productStore.searchName, productStore.productCategoryId],
    () => {
      productStore.fetchProducts()
    },
    { immediate: false }
  )
</script>