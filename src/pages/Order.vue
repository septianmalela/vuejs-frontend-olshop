<template>
  <div class="container mt-4">
    <h3>My Orders</h3>

    <div v-if="orderStore.loading">Loading orders...</div>
    <div v-if="orderStore.error" class="text-danger">{{ orderStore.error }}</div>

    <table v-if="!orderStore.loading && orderStore.orders.length" class="table table-striped mt-3">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orderStore.orders" :key="order.id" @click="openDetail(order)" style="cursor: pointer;">
          <td>{{ order.id }}</td>
          <td>{{ formatDate(order.created_at) }}</td>
          <td>{{ order.status }}</td>
          <td>{{ formatRupiah(order.total_price) }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="!orderStore.loading && orderStore.orders.length === 0">
      No orders found.
    </div>
  </div>

  <div class="modal fade" tabindex="-1" :class="{ show: showModal }" style="display: block;" v-if="showModal" @click.self="closeModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Order Detail #{{ selectedOrder.id }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p><strong>Date:</strong> {{ formatDate(selectedOrder.created_at) }}</p>
          <p><strong>Total Price:</strong> {{ formatRupiah(selectedOrder.total_price) }}</p>

          <h6>Items:</h6>
          <table class="table table-sm">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in selectedOrder.order_items" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.qty }}</td>
                <td>{{ formatRupiah(item.price) }}</td>
                <td>{{ formatRupiah(item.qty * item.price) }}</td>
              </tr>
              <tr class="fw-bold">
                <td colspan="3" class="text-end">Total:</td>
                <td>{{ formatRupiah(selectedOrder.total_price) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useOrderStore } from '@/stores/orderStore'
  import { formatRupiah } from '@/utils/currency'

  const orderStore    = useOrderStore()
  const showModal     = ref(false)
  const selectedOrder = ref(null)

  onMounted(() => {
    orderStore.fetchOrders()
  })


  function openDetail(order) {
    selectedOrder.value = order
    showModal.value     = true
  }

  function closeModal() {
    showModal.value     = false
    selectedOrder.value = null
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }
</script>
