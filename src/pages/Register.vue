<template>
  <div class="container mt-5">
    <h2 class="mb-4">Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-3">
        <label>Nama</label>
        <input type="text" v-model="name" class="form-control" required>
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input type="email" v-model="email" class="form-control" required>
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input type="password" v-model="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-success w-100">Register</button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const name     = ref('')
  const email    = ref('')
  const password = ref('')

  function handleRegister() {
    console.log("Register dengan", name.value, email.value, password.value)
    // nanti kita ganti dengan API call
  }
</script>
