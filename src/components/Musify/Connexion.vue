<script setup>
import { sendUser } from '@/utils'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const user = ref({})
const router = useRouter()
const submit = () => loginUser()

const data = ref({})
async function fetchData(params) {
  const res = await fetch('/user-data_log.json')
  data.value = await res.json()
}

const auth = ref(true)
function loginUser() {
  user.value = data.value.filter((word) => word.email == email.value)
  if (user.value.length > 0) {
    if (password.value == user.value[0].password) {
      sendUser(user.value[0])
      router.push(`/home/`)
    } else auth.value = false
  } else {
    // router.replace('/login')
    email.value = ''
    password.value = ''
    auth.value = false
  }
}

onMounted(() => fetchData())
</script>

<template>
  <header>
    <div class="min-h-screen text-gray-900 flex justify-center">
      <div
        class="max-w-screen-xl m-0 sm:m-10 bg-green-50 shadow sm:rounded-lg flex justify-center flex-1"
      >
        <form class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12" @submit.prevent="submit">
          <div class="mt-20 flex flex-col items-center">
            <h1 class="text-2xl xl:text-3xl font-extrabold">Connexion</h1>
            <div class="w-full flex-1 mt-8">
              <div class="flex flex-col items-center">
                <button
                  class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-300 text-black flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                >
                  <div class="bg-white p-2 rounded-full">
                    <svg class="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span class="ml-4"> Connexion avec Google </span>
                </button>
              </div>

              <div class="my-8 border-b text-center">
                <div
                  class="leading-none px-2 inline-block text-sm text-black tracking-wide font-medium bg-green-50 transform translate-y-1/2"
                >
                  Ou connexion avec e-mail
                </div>
              </div>

              <div class="flex justify-center">
                <div
                  id="toast-danger"
                  class="flex justify-start items-center p-2 text-gray-900 text-lg bg-red-100 rounded-lg shadow w-[320px]"
                  :class="{ auth: auth }"
                  role="alert"
                >
                  <div
                    class="inline-flex items-center justify-between flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg"
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
                  <div class="ms-3 text-sm font-normal">Identifiants incorrects</div>
                </div>
              </div>

              <div class="mx-auto max-w-xs mt-10">
                <input
                  v-model="email"
                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  required
                />
                <input
                  v-model="password"
                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  required
                />

                <button
                  class="mt-20 tracking-wide font-semibold bg-green-500 text-gray-100 text-lg w-full py-4 rounded-lg hover:bg-green-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none active:scale-90"
                >
                  <span class="ml-3"> Se connecter </span>
                </button>
              </div>
            </div>
          </div>
        </form>
        <div class="flex-1 bg-green-100 text-center pt-20 hidden lg:flex">
          <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <img src="../../assets/images/undraw_collaborators_re_hont.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.auth {
  display: none;
}
</style>
