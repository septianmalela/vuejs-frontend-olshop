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
            <select class="form-select w-100" v-if="!productCategoryStore.loading">
              <option selected>All Categories</option>
              <option v-for="product_category in productCategoryStore.productCategories" :key="product_category.id" :value="product_category.id">
                {{ product_category.name }}
              </option>
            </select>
            <div v-else>Loading...</div>
          </div>
          <div class="col-12 col-md">
            <div class="search-wrapper position-relative">
              <input class="form-control pe-5" type="search" placeholder="Search for more than 20,000 products" aria-label="Search">
              <i class="bi bi-search position-absolute" style="right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none;"></i>
            </div>
          </div>
        </form>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex flex-column align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="min-width: 120px;">
              <div class="d-flex align-items-center">
                <i class="bi bi-person-fill mx-2"></i>
                <span>
                  {{ authStore.isAuthenticated ? `Hi, ${userObj.name}` : 'Hi, Selamat Datang!' }}
                </span>
              </div>
              <small>
                {{ authStore.isAuthenticated ? formatRupiah(totalPrice) : '' }}
              </small>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li v-if="!authStore.isAuthenticated">
                <router-link to="/login" class="dropdown-item">Login</router-link>
              </li>
              <li v-if="!authStore.isAuthenticated">
                <router-link to="/register" class="dropdown-item">Register</router-link>
              </li>
              <li v-if="authStore.isAuthenticated">
                <a href="javascript:;" class="dropdown-item" @click.prevent="authStore.logout()">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { onMounted, computed } from 'vue'
  import { useAuthStore } from '@/stores/authStore'
  import { useProductCategoryStore } from '@/stores/productCategoryStore'
  import { useCartStore } from '@/stores/cartStore'
  import { useRouter } from 'vue-router'
  import { formatRupiah } from '@/utils/currency'

  const productCategoryStore = useProductCategoryStore()
  const authStore            = useAuthStore()
  const router               = useRouter()
  const cartStore            = useCartStore()

  const userObj = authStore.user ? JSON.parse(authStore.user) : null

  onMounted(() => {
    cartStore.fetchCart()
    productCategoryStore.fetchProductCategories()
  })

  const totalPrice = computed(() => {
    return cartStore.cart.total_price
  })
</script>