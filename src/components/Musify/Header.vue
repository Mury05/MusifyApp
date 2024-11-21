<script setup>
import { onMounted, watch, ref } from 'vue'
import LogOut from './LogOut.vue'
import { useRoute } from 'vue-router'
import { getUser } from '@/utils'

// Chrononomètre qui redemarre à chaque refraîchissement
onMounted(() => {
  let time = document.querySelector('#timer') //Récupérer l'élément
  let [sec, min, hrs] = [0, 0, 0] //Initialiser des variables à 0
  let t

  //Fonction pour incrémenter les secondes, minutes et heures
  const tick = () => {
    sec++
    if (sec >= 60) {
      sec = 0
      min++
      if (min >= 60) {
        min = 0
        hrs++
      }
    }
  }
  // Fonction pour remplir le html
  const add = () => {
    tick()
    time.textContent =
      'Time: ' +
      (hrs > 9 ? hrs : '0' + hrs) +
      'h : ' +
      (min > 9 ? min : '0' + min) +
      'min : ' +
      (sec > 9 ? sec : '0' + sec) +
      's'
    timer()
  }
  const timer = () => (t = setTimeout(add, 1000)) //Remplir le html chaque 1 seconde

  timer()
})

//Fonctionnalité de recherche dans le header
let searchTerme = ref('')
const emit = defineEmits(['search'])
watch(searchTerme, (val) => emit('search', val))

let user = getUser()
</script>

<template>
  <!-- La barre de navigation, de recherche et le chronomètre -->
  <header class="navigation flex items-center my-auto mx-auto w-5/6">
    <div class="flex items-center space-x-10 p-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        class="size-[70px] bg-green-500 rounded-full p-1"
      >
        <path
          fill-rule="evenodd"
          d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
          clip-rule="evenodd"
        />
      </svg>
      <ul class="flex items-center space-x-6">
        <li>
          <a class="text-2xl text-green-50 p-3 hover:bg-green-900 rounded-md" href="#">Home</a>
        </li>
        <li>
          <RouterLink
            class="text-2xl text-green-50 p-3 hover:bg-green-900 rounded-md"
            :to="`/home/albums`"
          >
            Albums
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="flex items-center space-x-10">
      <div class="search-part">
        <label class="relative block">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 fill-slate-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <input
            class="placeholder:text-slate-500 block bg-white w-[300px] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-600 focus:ring-green-600 focus:ring-1 sm:text-sm text-slate-900"
            placeholder="Que souhaitez-vous écouter ?"
            type="text"
            name="search"
            v-model="searchTerme"
          />
        </label>
      </div>

      <div class="text-2xl text-white flex space-x-4 justify-between">
        <p id="timer">00h 00min 00s</p>

        <RouterLink :to="`/login`" class="hover:bg-transparent" v-if="!user.isAuthenticated"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-10 bg-green-500 p-2 rounded-md cursor-pointer hover:size-11"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clip-rule="evenodd"
            />
          </svg>
        </RouterLink>
        <LogOut v-else />
      </div>
    </div>
  </header>
</template>

<style scoped>
.navigation {
  justify-content: space-between;
}
</style>
