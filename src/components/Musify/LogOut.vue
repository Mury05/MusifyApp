<script setup>
import { deleteUser } from '@/utils'
</script>

<template>
  <RouterLink :to="`/login`" class="hover:bg-transparent" replace>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-10 bg-red-500 p-2 rounded-md cursor-pointer hover:size-11"
      @click="deleteUser"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
      />
    </svg>

    <!-- <button id="signUp">Deconnexion</button> -->
  </RouterLink>
</template>

<style scoped></style>
