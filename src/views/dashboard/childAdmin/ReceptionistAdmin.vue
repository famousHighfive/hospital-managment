<script setup>
import { ref, computed } from 'vue'
import { getReceptionists, deleteReceptionist } from '@/services/receptionistService'
import ReceptionModalForm from '@/components/ui/reception/ReceptionModalForm.vue'
import BaseModal from '@/components/ui/BaseModal.vue'


const receptionists = getReceptionists()

const search = ref('')
const filterAvailable = ref('')

const showModal = ref(false)
const editingReceptionist = ref(null)

const filteredReceptionists = computed(() => {
  return receptionists.value.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesAvailable =
      filterAvailable.value === '' || r.available.toString() === filterAvailable.value

    return matchesSearch && matchesAvailable
  })
})

function handleEdit(r) {
  editingReceptionist.value = r
  showModal.value = true
}

function handleCloseModal() {
  showModal.value = false
  editingReceptionist.value = null
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Gestion des Réceptionnistes</h2>
      <button
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        @click="showModal = true"
      >
        + Ajouter Réceptionniste
      </button>
    </div>

    <!-- Filtres -->
    <div class="flex gap-4 mb-6">
      <input v-model="search" placeholder="Recherche..." class="border p-2 rounded-lg w-1/3" />
      <select v-model="filterAvailable" class="border p-2 rounded-lg">
        <option value="">Tous</option>
        <option value="true">Disponible</option>
        <option value="false">Indisponible</option>
      </select>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th class="p-4">Nom</th>
            <th class="p-4">Téléphone</th>
            <th class="p-4">Disponibilité</th>
            <th class="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="r in filteredReceptionists" :key="r.id" class="border-t hover:bg-gray-50">
            <td class="p-4 font-medium">{{ r.name }}</td>
            <td class="p-4">{{ r.phone }}</td>
            <td class="p-4">
              <span :class="r.available ? 'text-green-600' : 'text-gray-500'">
                {{ r.available ? 'Disponible' : 'Indisponible' }}
              </span>
            </td>
            <td class="p-4 text-right space-x-2">
              <button class="text-blue-600 hover:text-blue-800" @click="handleEdit(r)">✏️</button>
              <button class="text-red-500 hover:text-red-700" @click="deleteReceptionist(r.id)">🗑️</button>
            </td>
          </tr>

          <tr v-if="filteredReceptionists.length === 0">
            <td colspan="4" class="p-6 text-center text-gray-400">
              Aucun réceptionniste trouvé
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Ajouter / Modifier -->
    <BaseModal v-model="showModal">
      <ReceptionModalForm
        :receptionist="editingReceptionist"
        @close="handleCloseModal"
      />
    </BaseModal>

  </div>
</template>
