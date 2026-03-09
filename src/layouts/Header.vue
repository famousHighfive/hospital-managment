<script setup>
import { currentUser } from '@/services/authService';
// import { onMounted, ref } from 'vue';

// const userInitial = () => {
//   let fullName = currentUser.value.name.split(" ")

//   let output = []
//   for (let index = 0; index < fullName.length; index++) {
//     output.push(fullName[index][0])
//   }
//   return output.join("").toUpperCase()
// }
// onMounted(() => {
//   userInitial()
// })
// let inital = ref(userInitial())


</script>

<template>
  <header class="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">

    <!-- Left -->
    <div class="flex items-center gap-4">
      <!-- <button class="text-gray-500 hover:text-gray-700">
        🌙
      </button> -->
    </div>

    <!-- Right -->
    <div class="flex items-center gap-6">
      <span class="px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-full">
        {{ currentUser.role.toUpperCase() }}
      </span>

      <div class="text-right">
        <p class="font-medium text-gray-800">{{ currentUser.name }}</p>
        <p class="text-sm text-gray-500">{{ currentUser.email }}</p>
      </div>

      <div class="w-10 h-10 bg-emerald-600 text-white flex items-center justify-center rounded-full font-semibold">
        {{ inital }}
      </div>
    </div>
  </header>
</template>

<style scoped></style>
