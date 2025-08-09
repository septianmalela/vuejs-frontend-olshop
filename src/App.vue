<script setup lang="ts"></script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="@/assets/tks.png" alt="Bootstrap" width="50" height="50">
      </a>
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
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-fill mx-2"></i>
              Hi, Selamat Datang!
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Login</a></li>
              <li><a class="dropdown-item" href="#">Register</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container pt-5">
    <h4>Category</h4>
    <div class="card-scroll-wrapper">
      <div class="card-scroll">
        <div class="card text-center" v-for="product_category in productCategoryStore.productCategories" :key="product_category.id" :value="product_category.id">
          <img :src="product_category.image || imageNotFound" class="card-img-top"/>
          <div class="card-body">
            <h6 class="card-title">{{ product_category.name }}</h6>
          </div>
        </div>
      </div>
    </div>

    <h4 class="pt-5">Barang</h4>
    <div class="row" v-if="!productStore.loading">
      <div class="col-sm-12 col-md-6 col-lg-3 mb-3" v-for="product in productStore.products" :key="product.id">
        <div class="card text-center h-100 custom-card" style="width: 100%;">
          <img :src="product.image || imageNotFound" class="card-img-top custom-card-img mt-0"/>
          <div class="card-body">
            <h6 class="card-title text-start">{{ product.name }}</h6>
            <h6 class="card-title text-start fw-bold">{{ formatRupiah(product.price) }}</h6>
            <div class="d-flex align-items-center justify-content-between mt-2">
              <button class="btn btn-sm btn-outline-secondary" @click="productStore.decrementQty(product.id)">-</button>
              <input type="number" class="form-control form-control-sm mx-1 text-center" style="width: 50px;" v-model.number="product.qty" @input="productStore.setQty(product.id, product.qty)" readonly>
              <button class="btn btn-sm btn-outline-secondary" @click="productStore.incrementQty(product.id)">+</button>
              <span>Add to Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
    <FooterComponent />
  </div>
</template>

<script setup>
  import "@/assets/styles/app.css";
  import imageNotFound from '@/assets/image-not-found.png'
  import { onMounted } from 'vue'
  import { useProductCategoryStore } from '@/stores/productCategoryStore'
  import { useProductStore } from '@/stores/productStore'
  import { formatRupiah } from '@/utils/currency'
  import FooterComponent from './components/Footer.vue'

  const productCategoryStore = useProductCategoryStore()
  const productStore         = useProductStore()

  onMounted(() => {
    productCategoryStore.fetchProductCategories()
    productStore.fetchProducts()
  })
</script>
