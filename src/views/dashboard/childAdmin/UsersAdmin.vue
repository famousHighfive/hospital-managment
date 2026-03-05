<script setup>
import FormUser from '@/components/form/FormUser.vue';
import { getUsers, deleteUser } from '@/services/userService'
import { ref } from 'vue'
import Swal from 'sweetalert2'

const users = getUsers()
const showModal = ref(false)
const selectedUser = ref(null)

// 🔹 Ouvre le formulaire pour modification
function editUser(user) {
  selectedUser.value = user
  showModal.value = true
}

// 🔹 Supprime un utilisateur avec SweetAlert2
async function handleDeleteUser(id) {
  const result = await Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: "Vous ne pourrez pas revenir en arrière !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Oui, supprimer !',
    cancelButtonText: 'Annuler'
  })

  if (result.isConfirmed) {
    deleteUser(id)
    Swal.fire(
      'Supprimé !',
      'L\'utilisateur a été supprimé.',
      'success'
    )
  }
}
</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">Gestion des Utilisateurs</h1>
        <p class="text-gray-500">Gérer les accès au système</p>
      </div>
      <button
        class="flex items-center gap-2 bg-[#108565] text-white px-5 py-2.5 rounded-lg hover:bg-[#0d6d53] transition shadow-md font-semibold"
        @click="() => { selectedUser = null; showModal = true }"
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
          <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50">
            <td class="py-3 px-4">{{ user.name }}</td>
            <td class="py-3 px-4">{{ user.email }}</td>
            <td class="py-3 px-4">
              <span
                class="px-2 py-1 rounded-full text-xs"
                :class="{
                  'bg-green-100 text-green-700': user.role === 'admin',
                  'bg-blue-100 text-blue-700': user.role === 'doctor',
                  'bg-purple-100 text-purple-700': user.role === 'receptioniste'
                }"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="py-3 px-4">
              <span class="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                Actif
              </span>
            </td>
            <td class="py-3 px-4 flex gap-2">
              <!-- Modifier -->
              <button class="text-blue-600 hover:underline" @click="editUser(user)">
                ✏️
              </button>

              <!-- Supprimer -->
              <button
                v-if="!user.isFake"
                class="text-red-600 hover:underline"
                @click="handleDeleteUser(user.id)"
              >
                🗑️
              </button>

              <span v-else class="text-gray-400 text-xs">Système</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal ajout / modification -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-transparent bg-black backdrop-blur-sm flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-xl w-1/3">
        <FormUser :user="selectedUser" @close="showModal = false" />
      </div>
    </div>
  </div>
</template>