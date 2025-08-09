<template>
  <div class="container mt-5">
    <div class="text-center">
      <img src="@/assets/tks.png" alt="Bootstrap" width="200" height="200">
    </div>
    <h2 class="mb-4">Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-3">
        <label>Nama</label>
        <input type="text" v-model="name" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Email</label>
        <input type="email" v-model="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Password</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>

      <div class="d-flex">
        <button type="submit" class="btn btn-success me-3" :disabled="registerStore.loading">
          {{ registerStore.loading ? 'Loading...' : 'Register' }}
        </button>
        <router-link to="/login" class="btn btn-primary">Login</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRegisterStore } from '@/stores/registerStore'
  import { showToast } from '../utils/toast'

  const registerStore = useRegisterStore()

  const name     = ref('')
  const email    = ref('')
  const password = ref('')

  function handleRegister() {
    const payload = {
      name: name.value,
      email: email.value,
      password: password.value
    }

    registerStore.register(payload)
      .then(res => {
        showToast('Register berhasil!')
      })
      .catch(err => {
        console.error(err)
      })
  }
</script>
