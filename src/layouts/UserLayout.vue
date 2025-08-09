<template>
  <div>
    <Navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
  import Navbar from '@/components/Navbar.vue'
  import Footer from '@/components/Footer.vue'
</script>
