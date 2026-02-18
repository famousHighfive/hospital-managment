<script setup>
import { ref, computed } from 'vue'
import { getDoctors, deleteDoctor } from '@/services/doctorService'
import { patients } from '@/services/patientService'

const doctors = getDoctors()

const search = ref('')
const filterAvailable = ref('')

const filteredDoctors = computed(() => {
  return doctors.value.filter(d => {

    const matchesSearch =
      d.name.toLowerCase().includes(search.value.toLowerCase()) ||
      d.speciality.toLowerCase().includes(search.value.toLowerCase())

    const matchesAvailable =
      filterAvailable.value === '' ||
      d.available.toString() === filterAvailable.value

    return matchesSearch && matchesAvailable
  })
})

function getPatientCount(doctorId) {
  return patients.value.filter(p => p.doctorId === doctorId).length
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">
          Gestion des Médecins
        </h2>
        <p class="text-gray-500 text-sm">
          Gérer tous les médecins de l'hôpital
        </p>
      </div>

      <RouterLink
        :to="{ name: 'dashboard-admin-doctor-create' }"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        + Ajouter Médecin
      </RouterLink>
    </div>

    <!-- Filtres -->
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

    <!-- TABLE -->
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full text-left border-collapse">

        <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th class="p-4">Nom</th>
            <th class="p-4">Spécialité</th>
            <th class="p-4">Téléphone</th>
            <th class="p-4">Disponibilité</th>
            <th class="p-4">Nombre de Patients</th>
            <th class="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="doctor in filteredDoctors"
            :key="doctor.id"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="p-4 font-medium text-gray-800">
              {{ doctor.name }}
            </td>

            <td class="p-4 text-gray-600">
              {{ doctor.speciality }}
            </td>

            <td class="p-4 text-gray-600">
              {{ doctor.phone }}
            </td>

            <td class="p-4">
              <span
                :class="doctor.available
                  ? 'text-green-600 flex items-center gap-2'
                  : 'text-gray-500 flex items-center gap-2'"
              >
                <span
                  :class="doctor.available
                    ? 'w-2 h-2 bg-green-500 rounded-full'
                    : 'w-2 h-2 bg-gray-400 rounded-full'"
                ></span>

                {{ doctor.available ? 'Disponible' : 'Indisponible' }}
              </span>
            </td>

            <td class="p-4 text-gray-700">
              {{ getPatientCount(doctor.id) }}
            </td>

            <td class="p-4 text-right space-x-3">
              <RouterLink
                :to="`/doctor/${doctor.id}`"
                class="text-blue-600 hover:text-blue-800"
              >
                ✏️
              </RouterLink>

              <button
                class="text-red-500 hover:text-red-700"
                @click="deleteDoctor(doctor.id)"
              >
                🗑️
              </button>
            </td>

          </tr>

          <!-- Si aucun médecin -->
          <tr v-if="filteredDoctors.length === 0">
            <td colspan="6" class="p-6 text-center text-gray-400">
              Aucun médecin trouvé
            </td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>
