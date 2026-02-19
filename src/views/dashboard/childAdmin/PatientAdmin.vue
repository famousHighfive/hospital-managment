<script setup>
import { ref, computed } from 'vue'
import { deletePatient, patients } from '@/services/patientService'
import BaseModal from '@/components/ui/BaseModal.vue'
import PatientFormModal from '@/components/ui/patient/PatientFormModal.vue'
import { doctors} from '@/services/doctorService'

const search = ref('')
const showAddModal = ref(false)
const editingPatient = ref(null)
const statusFilter = ref('Tous')



const filteredPatients = computed(() => {
  const searchValue = search.value?.toLowerCase() || ''

  return patients.value.filter(p => {

    const firstName = p?.firstName?.toLowerCase() || ''
    const lastName  = p?.lastName?.toLowerCase() || ''

    const matchesSearch =
      firstName.includes(searchValue) ||
      lastName.includes(searchValue)

    const matchesStatus =
      statusFilter.value === 'Tous' ||
      p?.status === statusFilter.value

    return matchesSearch && matchesStatus
  })
})



/* --------------------------
   EDIT
--------------------------- */
const handleEdit = (patient) => {
  editingPatient.value = patient
  showAddModal.value = true
}

const closeModal = () => {
  showAddModal.value = false
  editingPatient.value = null
}


/* --------------------------
   NOM COMPLET MEDECIN
--------------------------- */
const getDoctorNameById = (doctorId) => {

  if (!doctorId) return "Non assigné"

  const doctor = doctors.value.find(d => d.id === doctorId)

  if (!doctor) return "Médecin introuvable"

  return `${doctor.name}`
}

/* --------------------------
   DELETE
--------------------------- */
const handleDelete = (id) => {
    deletePatient(id)
}
</script>

<template>
    <div v-if="$route.params.id">
        <RouterView />
    </div>
    <div v-else class="p-8 bg-gray-50 min-h-screen">

        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-3xl font-bold">Gestion des Patients</h1>
                <p class="text-gray-500">Gérer tous les patients de l'hôpital</p>
            </div>

            <button @click="showAddModal = true"
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                + Ajouter Patient
            </button>
        </div>

<!-- Search & Filter Section -->
<div class="bg-white p-4 rounded-xl shadow mb-6">

  <div class="grid md:grid-cols-3 gap-4">

    <!-- Recherche -->
    <div class="col-span-2">
      <input
        v-model="search"
        type="text"
        placeholder="🔎 Rechercher un patient par nom..."
        class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <!-- Filtre par statut -->
    <div>
      <select
        v-model="statusFilter"
        class="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="Tous">Tous les statuts</option>
        <option value="Hospitalisé">Hospitalisé</option>
        <option value="En consultation">En consultation</option>
        <option value="Sorti">Sorti</option>
      </select>
    </div>

  </div>

</div>


        <!-- Table -->
        <div class="bg-white rounded-xl shadow overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="p-4">Nom</th>
                        <th>Prenom</th>
                        <th>Genre</th>
                        <th>Téléphone</th>
                        <th>Groupe</th>
                        <th>Médecin</th>
                        <th>Chambre</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="p in filteredPatients" :key="p.id" class="border-t">
                        <td class="p-4">{{ p.lastName }}</td>
                        <td>{{ p.firstName }}</td>
                        <td>{{ p.gender }}</td>
                        <td>{{ p.phone }}</td>
                        <td>{{ p.bloodGroup }}</td>
                        <td>{{getDoctorNameById(p.doctorId)}}</td>
                        <td>{{ p.room }}</td>
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
                            <button @click="$router.push({ name: 'patient-info-admin-detail', params: { id: p.id } })"
                                class="cursor-pointer">👁</button>
                            <button @click="handleEdit(p)" class="cursor-pointer">✏️</button>
                            <button @click="handleDelete(p.id)" class="cursor-pointer">🗑</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="filteredPatients.length === 0"
     class="text-center text-gray-500 py-10">

  <p class="text-lg font-semibold">Aucun patient trouvé...</p>
  <p class="text-sm mt-2">Vérifiez votre recherche ou changez le filtre.</p>

</div>

        <!-- Modal Ajouter -->
<BaseModal v-model="showAddModal">
  <PatientFormModal
    :patient="editingPatient"
    @close="closeModal"
  />
</BaseModal>

    </div>

</template>
