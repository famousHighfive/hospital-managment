<script setup>
import { ref, computed } from 'vue'
import { getReceptionists, deleteReceptionist } from '@/services/receptionistService'

const receptionists = getReceptionists()

const search = ref('')
const filterAvailable = ref('')

const filteredReceptionists = computed(() => {
  return receptionists.value.filter(r => {

    const matchesSearch =
      r.name.toLowerCase().includes(search.value.toLowerCase())

    const matchesAvailable =
      filterAvailable.value === '' ||
      r.available.toString() === filterAvailable.value

    return matchesSearch && matchesAvailable
  })
})
</script>
<template>
  <div class="p-6 bg-gray-50 min-h-screen">

    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-bold">Gestion des Réceptionnistes</h2>
        <p class="text-gray-500 text-sm">
          Gérer les réceptionnistes de l'hôpital
        </p>
      </div>

      <RouterLink
        :to="{ name: 'dashboard-admin-receptionist-create' }"
        class="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        + Ajouter Réceptionniste
      </RouterLink>
    </div>

    <div class="flex gap-4 mb-6">
      <input
        v-model="search"
        placeholder="Recherche..."
        class="border p-2 rounded-lg w-1/3"
      />

      <select v-model="filterAvailable" class="border p-2 rounded-lg">
        <option value="">Tous</option>
        <option value="true">Disponible</option>
        <option value="false">Indisponible</option>
      </select>
    </div>

    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full text-left">

        <thead class="bg-gray-100 text-sm uppercase">
          <tr>
            <th class="p-4">Nom</th>
            <th class="p-4">Téléphone</th>
            <th class="p-4">Disponibilité</th>
            <th class="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="r in filteredReceptionists"
            :key="r.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="p-4 font-medium">{{ r.name }}</td>

            <td class="p-4">{{ r.phone }}</td>

            <td class="p-4">
              <span
                :class="r.available
                  ? 'text-green-600 flex items-center gap-2'
                  : 'text-gray-500 flex items-center gap-2'"
              >
                <span
                  :class="r.available
                    ? 'w-2 h-2 bg-green-500 rounded-full'
                    : 'w-2 h-2 bg-gray-400 rounded-full'"
                ></span>

                {{ r.available ? 'Disponible' : 'Indisponible' }}
              </span>
            </td>

            <td class="p-4 text-right space-x-3">
              <button
                class="text-red-500"
                @click="deleteReceptionist(r.id)"
              >
                🗑️
              </button>
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

  </div>
</template>
