<script setup>
import { ref, watch } from 'vue'
import Album from './Album.vue'
import Detail from './Detail.vue'

let checkedSong = ref({})
let playSong = ref([])
let newAlbum = ref({})

// Fonctionnalité de recherche
let search = ref('')

//Definiton de props pour récupérer le terme du parent

const props = defineProps({
  searchTerme: String
})

watch(
  () => props.searchTerme,
  (val) => (search = val)
)
</script>

<template>
  <div class="px-5 mx-5 grid grid-cols-[450px_minmax(900px,_1fr)]">
    <Detail :song="checkedSong" @play="(msg) => (playSong = msg)" />
    <Album
      @-check-song="(msg) => (checkedSong = msg)"
      :search-terme="search"
      :play-song="playSong"
    />
  </div>
</template>

<style scoped>
.content {
  background-color: #222222;
}
</style>
