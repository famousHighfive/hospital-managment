<script setup>
import { ref, computed } from 'vue'
import { getDoctors, deleteDoctor } from '@/services/doctorService'
import { patients } from '@/services/patientService'
import DoctorModalForm from '@/components/ui/doctor/DoctorModalForm.vue'
import BaseModal from '@/components/ui/BaseModal.vue'


const doctors = getDoctors()

const search = ref('')
const filterAvailable = ref('')

const showModal = ref(false)
const editingDoctor = ref(null)

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

function handleEdit(doctor) {
  editingDoctor.value = doctor
  showModal.value = true
}

function handleCloseModal() {
  showModal.value = false
  editingDoctor.value = null
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Gestion des Médecins</h2>
      <button
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        @click="showModal = true"
      >
        + Ajouter Médecin
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
            <th class="p-4">Spécialité</th>
            <th class="p-4">Téléphone</th>
            <th class="p-4">Disponibilité</th>
            <th class="p-4">Patients</th>
            <th class="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="d in filteredDoctors" :key="d.id" class="border-t hover:bg-gray-50">
            <td class="p-4">{{ d.name }}</td>
            <td class="p-4">{{ d.speciality }}</td>
            <td class="p-4">{{ d.phone }}</td>
            <td class="p-4">
              <span :class="d.available ? 'text-green-600' : 'text-gray-500'">
                {{ d.available ? 'Disponible' : 'Indisponible' }}
              </span>
            </td>
            <td class="p-4">{{ getPatientCount(d.id) }}</td>
            <td class="p-4 text-right space-x-2">
              <button class="text-blue-600 hover:text-blue-800" @click="handleEdit(d)">✏️</button>
              <button class="text-red-500 hover:text-red-700" @click="deleteDoctor(d.id)">🗑️</button>
            </td>
          </tr>

          <tr v-if="filteredDoctors.length === 0">
            <td colspan="6" class="p-6 text-center text-gray-400">
              Aucun médecin trouvé
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Ajouter / Modifier -->
    <BaseModal v-model="showModal">
      <DoctorModalForm
        :doctor="editingDoctor"
        @close="handleCloseModal"
      />
    </BaseModal>

  </div>
</template>
