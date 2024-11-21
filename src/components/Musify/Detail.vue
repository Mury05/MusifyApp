<script setup>
import { ref, watch, computed } from 'vue'
//Definiton de props pour récupérer le son sélectionné du parent
const props = defineProps({
  song: Object
})

let checkSong = ref({})
watch(
  //Fonction pour observer le props et récupérer sa valeur dans une variable
  () => props.song,
  (val) => console.log((checkSong.value = val))
)

// Jouer le song
const player = ref(false)

//Definiton de emit pour envoyer un msg validé du play sélectionné au parent

const emit = defineEmits(['play'])
function playSong(param) {
  player.value = !player.value
  if (player.value) {
    emit('play', param)
  }
}
</script>
<template>
  <div :class="{ disapear: props.song.id }"></div>
  <Transition name="bounce">
    <div
      :class="{ disapear: !props.song.id }"
      class="m-1 mr-5 content-detail bg-green-100"
      id="contenu-detail"
    >
      <div class="flex p-4 justify-between">
        <img
          :class="{ disque: player }"
          class="aspect-h-1 m-2 aspect-w-1 w-1/2 overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7"
          src="../../assets/images/R.jfif"
          alt="disque"
        />
        <div class="w-full">
          <div class="">
            <h6 class="p-2">Album</h6>
            <h3 class="p-3 uppercase text-green-50 text-3xl font-medium">{{ checkSong.ref }}</h3>
          </div>
        </div>
        <div class="relative flex flex-col justify-between">
          <div class="rounded-full absolute cursor-pointer top-0 right-[-8px] p-3 heart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-10"
              v-on:click="heart"
              id="heart"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
          <div
            class="rounded-full absolute cursor-pointer top-[6.5em] right-0 bg-green-800 p-3 player"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              class="size-6"
              v-on:click="playSong(checkSong.tags)"
              v-if="player"
            >
              <path
                fill-rule="evenodd"
                d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                clip-rule="evenodd"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              class="size-6"
              id="click-play"
              v-on:click="playSong(checkSong.tags)"
              v-else
            >
              <path
                fill-rule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="px-4">
        <h3 class="mt-4 text-2xl font-medium text-green-50">{{ checkSong.title }}</h3>
        <!-- Song -->
        <p class="mt-4 text-lg font-medium text-green-50">{{ checkSong.name }}</p>
      </div>
      <p class="p-4 text-white text-lr text-justify leading-relaxed">{{ checkSong.description }}</p>

      <div class="m-5 bg-green-800 rounded-md">
        <div class="m-2 flex justify-between border-b-2 border-gray-800">
          <div class="flex my-5 space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
              />
            </svg>

            <h3 class="text-white font-medium uppercase">Songs</h3>
          </div>
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 my-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span class="my-5 mx-2 text-white text-sm font-medium">{{ checkSong.duration }}ms</span>
          </div>
        </div>
        <ul class="p-5">
          <li
            v-for="(tag, index) in checkSong.tags"
            :key="index"
            class="text-sm list-decimal text-white uppercase m-5"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.content-detail {
  background-color: rgb(48, 48, 48);
}
.disapear {
  display: none;
}
@keyframes disque {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.disque {
  animation: disque 2s linear infinite;
}
</style>
