<script setup>
import { ref, watch } from 'vue'
import Header from './Header.vue'
import Main from './Main.vue'

// Fonctionnalité de recherche
let searchTerme = ref('')
</script>

<template>
  <Header @search="(msg) => (searchTerme = msg)" />
  <Main :search-terme="searchTerme" />
</template>

<style scoped></style>
