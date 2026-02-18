<script setup>
import FormUser from '@/components/form/FormUser.vue';


import { ref } from 'vue'
const showModal = ref(false)
</script>


<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">Gestion des Utilisateurs</h1>
        <p class="text-gray-500">Gérer les accès au système</p>
      </div>
      <button
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        @click="showModal = true"
      >
        + Nouvel Utilisateur
      </button>
    </div>
    <div class="bg-white rounded-xl shadow overflow-x-auto">
      <table class="min-w-full text-left text-sm">
        <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th class="py-3 px-4">Nom</th>
            <th class="py-3 px-4">Email</th>
            <th class="py-3 px-4">Rôle</th>
            <th class="py-3 px-4">Statut</th>
            <th class="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr class="border-b hover:bg-gray-50">
            <td class="py-3 px-4">Admin User</td>
            <td class="py-3 px-4">admin@hospital.com</td>
            <td class="py-3 px-4">
              <span class="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">Administrateur</span>
            </td>
            <td class="py-3 px-4">
              <span class="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">Actif</span>
            </td>
            <td class="py-3 px-4 flex gap-2">
              <button class="text-blue-600 hover:underline">✏️</button>
              <button class="text-red-600 hover:underline">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="showModal"
 class="fixed inset-0 bg-transparent bg-black backdrop-blur-sm flex items-center justify-center"
  >
      <div class="bg-white p-6 rounded-xl w-1/3">
        <FormUser @close="showModal = false"/>
      </div>
    </div>

  </div>
</template>

<style scoped>


</style>