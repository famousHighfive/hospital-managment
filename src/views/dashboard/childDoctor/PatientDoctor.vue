<script setup>
import { ref, computed } from 'vue'
import { patients, deletePatient } from '@/services/patientService'
import { currentUser } from '@/services/authService'
import BaseModal from '@/components/ui/BaseModal.vue'
import PatientFormModal from '@/components/ui/patient/PatientFormModal.vue'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { users } from '@/services/userService'
import { doctors } from '@/services/doctorService'

const router = useRouter()

/* ================================
   OWN DOCTOR DATA
================================ */
const doctorIdConnected = users.value.find(d => d.id === currentUser.value?.id)
const docId = doctors.value.find(d => d.userId === doctorIdConnected.id)
const myPatients = computed(() => {
  if (!docId) return []
  return patients.value.filter(p => p.doctorId === docId.id)
})


/* ================================
   STATE
================================ */

const route = useRoute()
const search = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const selectedPatient = ref(null)

/* ================================
   FILTER
================================ */

const filteredPatients = computed(() => {

  let list = patients.value

  // 🔐 Si l'utilisateur connecté est un doctor
  if (
    currentUser.value &&
    currentUser.value.role === 'doctor' &&
    currentUser.value.doctorId
  ) {
    list = list.filter(
      p => p.doctorId === currentUser.value.doctorId
    )
  }

  // 🔎 Recherche
  return list.filter(p =>
    (p.firstName + ' ' + p.lastName)
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )
})

/* ================================
   ACTIONS
================================ */

const openEditModal = (patient) => {
  selectedPatient.value = patient
  showEditModal.value = true
}

const handleDelete = (id) => {
  Swal.fire({
    title: "Êtes-vous sûr ?",
    text: "Cette action est irréversible !",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Oui, supprimer !",
    cancelButtonText: "Annuler"
  }).then((result) => {
    if (result.isConfirmed) {
      deletePatient(id)
      Swal.fire(
        "Supprimé !",
        "Le patient a été retiré de la liste.",
        "success"
      )
    }
  })
}


</script>

<template>
  <div v-if="$route.params.id">
    <RouterView />
  </div>

  <div v-else class="p-8 bg-gray-50 min-h-screen">

    <!-- ================= HEADER ================= -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">Gestion des Patients</h1>
        <p class="text-gray-500">
          Gérer les patients assignés
        </p>
      </div>

      <!-- Bouton visible seulement si pas doctor -->
      <button v-if="currentUser?.role !== 'doctor'" @click="showAddModal = true"
        class="flex items-center gap-2 bg-[#108565] text-white px-5 py-2.5 rounded-lg hover:bg-[#0d6d53] transition shadow-md font-semibold">
        + Ajouter Patient
      </button>
    </div>

    <!-- ================= SEARCH ================= -->
    <div class="mb-4">
      <input v-model="search" type="text" placeholder="Rechercher un patient..."
        class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
    </div>

    <!-- ================= TABLE ================= -->
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-4">Nom</th>
            <th>Prénom</th>
            <th>Genre</th>
            <th>Téléphone</th>
            <th>Groupe</th>
            <th>Chambre</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="p in myPatients" :key="p.id" class="border-t hover:bg-gray-50">
            <td class="p-4 font-semibold">{{ p.lastName }}</td>
            <td>{{ p.firstName }}</td>
            <td>{{ p.gender }}</td>
            <td>{{ p.phone }}</td>
            <td>{{ p.bloodGroup }}</td>
            <td>{{ p.room || 'N/A' }}</td>

            <td>
              <span class="px-3 py-1 text-sm rounded-full" :class="{
                'bg-green-100 text-green-700': p.status === 'Hospitalisé',
                'bg-orange-100 text-orange-700': p.status === 'En consultation',
                'bg-gray-200 text-gray-600': p.status === 'Sorti'
              }">
                {{ p.status }}
              </span>
            </td>

            <td class="space-x-2">
              <button @click="$router.push({ name: 'patient-info-doctor-detail', params: { id: p.id } })">👁</button>

              <!-- Edit interdit si doctor -->
              <button @click="openEditModal(p)">
                ✏️
              </button>

              <!-- Delete seulement admin -->
              <button v-if="currentUser?.role === 'admin'" @click="handleDelete(p.id)">
                🗑
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredPatients.length === 0" class="p-8 text-center text-gray-400">
        Aucun patient trouvé.
      </div>
    </div>

    <!-- ================= ADD MODAL ================= -->
    <BaseModal v-model="showAddModal">
      <PatientFormModal mode="create" @close="showAddModal = false" />
    </BaseModal>

    <!-- ================= EDIT MODAL ================= -->
    <BaseModal v-model="showEditModal">
      <PatientFormModal :patient="selectedPatient" mode="edit" @close="showEditModal = false" />
    </BaseModal>

  </div>
</template>