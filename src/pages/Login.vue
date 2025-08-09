<template>
  <div class="container mt-5">
    <h2 class="mb-4">Login Page</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label>Email</label>
        <input type="email" v-model="email" class="form-control" required>
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input type="password" v-model="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useLoginStore } from '@/stores/loginStore'
  import { showToast } from '../utils/toast'

  const loginStore = useLoginStore()

  const email    = ref('')
  const password = ref('')

  function handleLogin() {
    const payload = {
      email: email.value,
      password: password.value
    }

    loginStore.login(payload)
      .then(res => {
        showToast('Login berhasil!')
      })
      .catch(err => {
        console.error(err)
      })
  }
</script>
