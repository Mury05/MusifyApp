<script setup>
import { onMounted, ref, watch } from 'vue'
import Paginate from './Paginate.vue'

let albums = ref({}) // Récupérer la liste des albums
const urlAlbums = 'http://localhost:5173/src/assets/images/albums/albums.json' //Récupérer l'url dans une variable
async function fetchAlbums() {
  //Definition d'une fonction asynchrone
  const response = await fetch(urlAlbums)
  albums.value = await response.json()
}
fetchAlbums() //Appel de la fonction

let songObject = ref([])
const emit = defineEmits(['CheckSong'])
function sendToParent(param) {
  //Fonction envoyer au parent le song sélectionné
  emit('CheckSong', param)
}

let search = ref('')
const props = defineProps({
  // Fonctionnalité de recherche dans albums
  searchTerme: String,
  playSong: Array
})
let filteredAlbums = ref({})
watch(
  () => props.searchTerme,
  (terme) => {
    search.value = terme
    return (filteredAlbums.value = albums.value.filter(
      (word) =>
        word['title'].toLowerCase().indexOf(terme.toLowerCase()) !== -1 ||
        word['name'].toLowerCase().indexOf(terme.toLowerCase()) !== -1
    ))
  }
)

let progress = ref(0),
  compt = ref(1),
  length = ref(7)
watch(
  () => props.playSong,
  (val) =>
    setInterval(() => {
      //Barre de progression
      length.value = val.length
      if (compt.value === val.length) clearInterval()
      else {
        compt.value++
        if (progress.value <= 95) progress.value += 15
        else progress.value = 100
      }
    }, 50000)
)

const toast = ref(true)
function deleteAlbum(album) {
  let answer = confirm('Voulez-vous vraiment supprimer cet album ??')
  if (answer) {
    albums.value = albums.value.filter((w) => w.id !== album.id)
    toast.value = false
  }
}

// Ajout d'album

// const id = 0;
const categorie = ref('')
const title = ref('')
const author = ref('')
const description = ref('')
const durée = ref('')

const album = ref({})

const toastModal = ref(true)

const addAlbum = () => {
  album.value = {
    id: '12',
    ref: categorie.value,
    name: author.value,
    title: title.value,
    description: description.value,
    duration: durée.value,
    url: 'http://placehold.it/32x32',
    like: 'Much',
    tags: ['nisi', 'do', 'id', 'laborum', 'non', 'sint', 'cillum'],
    status: 'off'
  }
  toastModal.value = !toastModal.value
  albums.value.unshift(album.value)
  console.log(albums.value)
}
</script>
<template>
  <!-- MODAL AJOUT D'ALBUM-->

  <div
    class="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-40 items-center min-h-full transition"
    :class="{ toastModal: toastModal }"
  >
    <!-- overlay -->
    <div aria-hidden="true" class="fixed inset-0 w-full h-full cursor-pointer bg-black/50"></div>

    <!-- Modal -->
    <div class="relative p-4 my-auto w-full transition cursor-pointer pointer-events-none">
      <div
        class="relative py-2 mx-auto w-full max-w-xl bg-gray-200 rounded-xl cursor-default pointer-events-auto"
      >
        <button type="button" class="absolute top-2 right-2 rtl:right-auto rtl:left-2">
          <svg
            xlinkTitle="Close"
            class="w-6 h-6 text-gray-400 transition-all duration-500 ease-in-out cursor-pointer hover:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="green"
            aria-hidden="true"
            @click="toastModal = !toastModal"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <div class="p-2 space-y-2">
          <div class="p-2 space-y-2 text-center dark:text-white">
            <h2 class="text-xl font-bold tracking-tight text-black" id="page-action.heading">
              Ajouter un album
            </h2>
            <p class="text-gray-500">Veuillez renseigner les informations nécessaires</p>
          </div>
        </div>

        <div class="space-y-2">
          <div aria-hidden="true" class="px-2 border-t border-gray-700"></div>

          <div class="place-items-center px-4 py-2 mx-20">
            <form class="space-y-4" @submit.prevent="addAlbum()">
              <div>
                <label htmlFor="Full Name" class="mb-2 text-lg text-black"
                  >Catégorie<span class="inline-block p-1 text-sm text-red-600">*</span></label
                >
                <input
                  id="Full Name"
                  class="p-3 w-full text-black rounded-lg border border-gray-700 shadow-md duration-300 ease-in-out placeholder:text-base focus:outline-none"
                  type="text"
                  placeholder="Jazz"
                  v-model="categorie"
                  required
                />
              </div>
              <div>
                <label htmlFor="Full Name" class="mb-2 text-lg text-black"
                  >Titre<span class="inline-block p-1 text-sm text-red-600">*</span></label
                >
                <input
                  id="Full Name"
                  class="p-3 w-full text-black rounded-lg border border-gray-700 shadow-md duration-300 ease-in-out placeholder:text-base focus:outline-none"
                  type="text"
                  placeholder="Du tonnerre"
                  v-model="title"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" class="mb-2 text-lg text-black"
                  >Nom de l'auteur<span class="inline-block p-1 text-sm text-red-600"
                    >*</span
                  ></label
                >
                <input
                  id="subject"
                  class="p-3 w-full text-black rounded-lg border border-gray-700 shadow-md duration-300 ease-in-out placeholder:text-base focus:outline-none"
                  type="text"
                  placeholder="subject"
                  v-model="author"
                  required
                />
              </div>
              <div>
                <label htmlFor="Message" class="mb-2 text-lg text-black"
                  >Description<span class="inline-block p-1 text-sm text-red-600 st">*</span></label
                >
                <textarea
                  id="Message"
                  class="p-3 w-full text-black rounded-lg border border-gray-700 shadow-md duration-300 ease-in-out placeholder:text-base focus:outline-none"
                  placeholder="Message"
                  v-model="description"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="subject" class="mb-2 text-lg text-black"
                  >Durée de l'album<span class="inline-block p-1 text-sm text-red-600"
                    >*</span
                  ></label
                >
                <input
                  id="subject"
                  class="p-3 w-full text-black rounded-lg border border-gray-700 shadow-md duration-300 ease-in-out placeholder:text-base focus:outline-none"
                  type="number"
                  placeholder="500ms"
                  v-model="durée"
                  required
                />
              </div>
            </form>
          </div>

          <div aria-hidden="true" class="px-2 border-b border-gray-700"></div>
          <div class="px-6 py-2 mx-20">
            <div class="grid gap-10 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
              <button
                type="button"
                class="inline-flex items-center justify-center py-1 gap-1 mx-5 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-red-600 dark:hover:bg-red-500"
              >
                Cancel
              </button>

              <button
                type="submit"
                @click="addAlbum"
                class="inline-flex items-center justify-center py-1 gap-1 mx-5 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-green-800 hover:bg-green-600 focus:bg-green-500 focus:ring-offset-[#11071F]"
              >
                <span class="flex gap-1 items-center">
                  <span class=""> Send </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ALBUM CONTENT -->
  <div class="m-1 rounded-md content">
    <div class="px-1 py-5 mx-auto max-w-2xl sm:px-1 sm:py-5 lg:max-w-7xl lg:px-1">
      <div :class="{ disapear: !props.playSong.length > 0 }">
        <div class="mb-4 w-full h-2.5 bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            :style="{ width: progress + '%' }"
            class="h-2.5 bg-green-800 rounded-full dark:bg-green-500 progress"
          ></div>
        </div>
        <div>{{ compt + '/ ' + length }}</div>
      </div>

      <div
        id="toast-danger"
        class="flex items-center p-4 mb-4 text-gray-900 text-lg bg-red-100 rounded-lg shadow"
        :class="{ toast: toast }"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
            />
          </svg>
        </div>
        <div class="ms-3 text-sm font-normal">Album supprimé avec succès !</div>
        <button
          type="button"
          class="ms-auto -mx-1.5 -my-1.5 bg-red-100 text-gray-400 hover:text-red-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
          data-dismiss-target="#toast-danger"
          @click="toast = true"
          aria-label="Close"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>

      <div class="flex justify-between">
        <h2 class="m-5 text-4xl text-green-50">Albums</h2>

        <div class="flex space-x-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="p-2 mt-5 bg-green-500 rounded-md cursor-pointer size-10 hover:size-11"
            @click="toastModal = !toastModal"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

          <!-- Composant de pagination -->
          <Paginate />
        </div>
      </div>
      <ul
        id="albums"
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <li
          v-if="!search.length > 0"
          v-for="album in albums"
          :key="album.id"
          class="relative p-3 rounded-md transition duration-700 ease-in-out cursor-pointer group hover:bg-green-800"
        >
          <h3 class="p-3 text-xl font-medium text-green-50 text-green-100 uppercase">
            {{ album.ref }}
          </h3>

          <div
            class="overflow-hidden w-full bg-gray-200 rounded-lg aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7"
          >
            <video src="../../assets/images/song.mp4" loop muted autoplay></video>
          </div>

          <div class="rounded-full bg-red-600 absolute top-[10.5em] left-5 p-3 player">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              class="size-6"
              @click="deleteAlbum(album)"
            >
              <path
                fill-rule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div class="rounded-full bg-green-800 absolute top-[10.5em] right-5 p-3 player">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              class="size-6"
              id="click-play"
              @click="sendToParent(album)"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="flex justify-between items-center">
            <div>
              <h3 class="mt-4 text-lg font-medium text-green-50">{{ album.title }}</h3>
              <p class="mt-1 text-sm font-medium text-green-50">{{ album.name }}</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              id="heart"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
        </li>
        <li
          v-else
          v-for="album in filteredAlbums"
          class="relative p-3 rounded-md transition duration-700 duration-1000 ease-in-out delay-700 cursor-pointer group hover:bg-green-800"
        >
          <h3 class="p-3 text-xl font-medium text-green-50 text-green-100 uppercase">
            {{ album.ref }}
          </h3>

          <div
            class="overflow-hidden w-full bg-gray-200 rounded-lg aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7"
          >
            <video src="../../assets/images/song.mp4" loop muted autoplay></video>
          </div>
          <div class="rounded-full bg-green-800 absolute top-[10.5em] right-5 p-3 player">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              class="size-6"
              id="click-play"
              @click="sendToParent(album)"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="flex justify-between items-center">
            <div>
              <!-- Style -->
              <h3 class="mt-4 text-lg font-medium text-green-50">{{ album.title }}</h3>
              <!-- Song -->
              <p class="mt-1 text-sm font-medium text-green-50">{{ album.name }}</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              id="heart"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.disapear,
.player,
.toast,
.toastModal {
  display: none;
}

li:hover {
  .player {
    display: block;
  }
}

.progress {
  animation: move 250s ease-in;
}

@keyframes move {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}
</style>
