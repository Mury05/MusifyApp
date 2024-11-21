<template>
  <!-- <ul>
      <li><button @click="goToPage(1)">First</button></li>
      <li><button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button></li>
      <li v-for="page in pages" :key="page">
        <button @click="goToPage(page)" :class="{ active: page === currentPage }">{{ page }}</button>
      </li>
      <li><button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button></li>
      <li><button @click="goToPage(totalPages)">Last</button></li>
    </ul> -->

  <nav class="mt-5 flex justify-end">
    <ul class="flex items-center -space-x-px h-10 text-base">
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-900 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-white dark:border-gray-700 dark:text-black dark:hover:bg-green-800 dark:hover:text-white"
        >
          <svg
            class="w-3 h-3 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </a>
      </li>
      <li>
        <a
          href="#"
          aria-current="page"
          class="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-green-800 dark:text-white"
          >1</a
        >
      </li>
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-white dark:border-gray-700 dark:text-black dark:hover:bg-green-800 dark:hover:text-white"
          >2</a
        >
      </li>
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-white dark:border-gray-700 dark:text-black dark:hover:bg-green-800 dark:hover:text-white"
          >3</a
        >
      </li>
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-900 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-white dark:border-gray-700 dark:text-black dark:hover:bg-green-800 dark:hover:text-white"
        >
          <span class="sr-only">Next</span>
          <svg
            class="w-3 h-3 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    pages() {
      let pages = []
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('page-changed', page)
      }
    }
  }
}
</script>

<style scoped>
.active {
  font-weight: bold;
}
</style>
