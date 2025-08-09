<template>
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
              <span style="cursor: pointer;" @click="productStore.addToCart(product.id)">Add to Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
  import imageNotFound from '@/assets/image-not-found.png'
  import { onMounted, computed } from 'vue'
  import { useProductStore } from '@/stores/productStore'
  import { formatRupiah } from '@/utils/currency'
  import { useProductCategoryStore } from '@/stores/productCategoryStore'

  const productCategoryStore = useProductCategoryStore()
  const productStore         = useProductStore()

  onMounted(() => {
    productCategoryStore.fetchProductCategories()
    productStore.fetchProducts()
  })
</script>
