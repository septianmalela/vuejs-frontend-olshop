<script setup lang="ts"></script>

<template>
  <router-view />
  <Footer />
</template>

<script setup>
  import "@/assets/styles/app.css";
  import imageNotFound from '@/assets/image-not-found.png'
  import Footer from './components/Footer.vue'
</script>
