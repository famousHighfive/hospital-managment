<script setup>
import {
  patients,
  addPatient,
  deletePatient as deletePatientService,
  updatePatient,
  getPatientById,
} from '@/services/patientService'
import { ref, computed } from 'vue'

const search = ref('')
const statusFilter = ref('')

// Modal states
const showModal = ref(false)
const showDeleteConfirm = ref(false)
const isEditMode = ref(false)
const editingId = ref(null)
const viewingPatient = ref(null)
const showViewModal = ref(false)
const deleteConfirmId = ref(null)

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  gender: '',
  phone: '',
  bloodGroup: '',
  doctor: '',
  room: '',
  status: '',
})

// Form errors
const errors = ref({})

// Toast notification
const toast = ref({
  show: false,
  message: '',
  type: 'success',
})

// Available options
// const genderOptions = ['H', 'F']
const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const statusOptions = ['Hospitalisé', 'En consultation', 'Sorti']
const doctorOptions = [
  'Dr. Laurent Blanc',
  'Dr. Sophie Petit',
  'Dr. Marc Lefebvre',
  'Dr. Anne Durand',
  'Dr. Pierre Leclerc',
]

const filteredPatients = computed(() => {
  return patients.value.filter((p) => {
    const matchName = (p.firstName + ' ' + p.lastName)
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const matchStatus = !statusFilter.value || p.status === statusFilter.value

    return matchName && matchStatus
  })
})

// Modal methods
function openNewModal() {
  resetForm()
  isEditMode.value = false
  editingId.value = null
  showModal.value = true
}

function openEditModal(patient) {
  form.value = {
    firstName: patient.firstName,
    lastName: patient.lastName,
    gender: patient.gender,
    phone: patient.phone,
    bloodGroup: patient.bloodGroup,
    doctor: patient.doctor,
    room: patient.room,
    status: patient.status,
  }
  isEditMode.value = true
  editingId.value = patient.id
  errors.value = {}
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  resetForm()
}

function resetForm() {
  form.value = {
    firstName: '',
    lastName: '',
    gender: '',
    phone: '',
    bloodGroup: '',
    doctor: '',
    room: '',
    status: '',
  }
  errors.value = {}
}

// Validation
function validateForm() {
  errors.value = {}

  if (!form.value.firstName.trim()) {
    errors.value.firstName = 'Le prénom est requis'
  }

  if (!form.value.lastName.trim()) {
    errors.value.lastName = 'Le nom est requis'
  }

  if (!form.value.gender) {
    errors.value.gender = 'Le genre est requis'
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = 'Le téléphone est requis'
  }

  if (!form.value.bloodGroup) {
    errors.value.bloodGroup = 'Le groupe sanguin est requis'
  }

  if (!form.value.status) {
    errors.value.status = 'Le statut est requis'
  }

  return Object.keys(errors.value).length === 0
}

function clearError(field) {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

// Save patient
function savePatient() {
  if (!validateForm()) {
    showToast('Veuillez remplir tous les champs correctement', 'error')
    return
  }

  if (isEditMode.value) {
    updatePatient({
      id: editingId.value,
      ...form.value,
    })
    showToast('Patient modifié avec succès', 'success')
  } else {
    addPatient(form.value)
    showToast('Patient créé avec succès', 'success')
  }

  closeModal()
}

// Delete patient
function openDeleteConfirm(id) {
  deleteConfirmId.value = id
  showDeleteConfirm.value = true
}

function closeDeleteConfirm() {
  showDeleteConfirm.value = false
  deleteConfirmId.value = null
}

function confirmDelete() {
  if (deleteConfirmId.value !== null) {
    deletePatientService(deleteConfirmId.value)
    showToast('Patient supprimé avec succès', 'success')
    closeDeleteConfirm()
  }
}

// View patient details
function viewPatient(patient) {
  viewingPatient.value = patient
  showViewModal.value = true
}

function closeViewModal() {
  showViewModal.value = false
  viewingPatient.value = null
}

// Toast notification
function showToast(message, type = 'success') {
  toast.value = {
    show: true,
    message: message,
    type: type,
  }

  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}
</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen font-sans">
    <div class="flex items-start justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 tracking-tight">Gestion des Patients</h1>
        <p class="text-gray-500 mt-1 italic">Gérer tous les patients de l'hôpital</p>
      </div>

      <button
        class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-lg transition-all active:scale-95 font-semibold"
        @click="openNewModal"
      >
        <span class="text-2xl leading-none">+</span>
        Ajouter Patient
      </button>
    </div>

    <div class="flex gap-4 mb-6">
      <div class="flex-1 relative">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher un patient (nom ou prénom)..."
          class="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
        />
        <span class="absolute left-4 top-3 text-gray-400">🔍</span>
      </div>

      <select
        v-model="statusFilter"
        class="border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
      >
        <option value="">Tous les statuts</option>
        <option value="Hospitalisé">Hospitalisé</option>
        <option value="En consultation">En consultation</option>
        <option value="Sorti">Sorti</option>
      </select>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
          <tr>
            <th class="px-6 py-4 font-bold">Nom Complet</th>
            <th class="px-6 py-4 font-bold">Genre</th>
            <th class="px-6 py-4 font-bold">Téléphone</th>
            <th class="px-6 py-4 font-bold">Groupe Sanguin</th>
            <th class="px-6 py-4 font-bold">Médecin</th>
            <th class="px-6 py-4 font-bold text-center">Chambre</th>
            <th class="px-6 py-4 font-bold">Statut</th>
            <th class="px-6 py-4 text-right font-bold">Actions</th>
          </tr>
        </thead>

        <tbody class="text-gray-700 text-sm divide-y divide-gray-100">
          <tr
            v-for="patient in filteredPatients"
            :key="patient.id"
            class="hover:bg-gray-50/80 transition-colors"
          >
            <td class="px-6 py-4 font-semibold text-gray-900">
              {{ patient.firstName }} {{ patient.lastName }}
            </td>
            <td class="px-6 py-4">
              <span
                :class="patient.gender === 'H' ? 'text-blue-600' : 'text-pink-600'"
                class="font-bold"
              >
                {{ patient.gender }}
              </span>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ patient.phone }}</td>
            <td class="px-6 py-4">
              <span
                class="px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-bold border border-red-100"
              >
                {{ patient.bloodGroup }}
              </span>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ patient.doctor || '—' }}</td>
            <td class="px-6 py-4 text-center italic text-gray-500">{{ patient.room || 'N/A' }}</td>

            <td class="px-6 py-4">
              <span
                v-if="patient.status === 'Hospitalisé'"
                class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold"
              >
                {{ patient.status }}
              </span>
              <span
                v-else-if="patient.status === 'En consultation'"
                class="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-200"
              >
                {{ patient.status }}
              </span>
              <span
                v-else
                class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold"
              >
                {{ patient.status }}
              </span>
            </td>

            <td class="px-6 py-4 text-right space-x-3">
              <button
                class="transition-transform hover:scale-125 hover:text-blue-500"
                title="Voir"
                @click="viewPatient(patient)"
              >
                👁
              </button>
              <button
                class="transition-transform hover:scale-125 hover:text-emerald-600"
                title="Modifier"
                @click="openEditModal(patient)"
              >
                ✏️
              </button>
              <button
                class="transition-transform hover:scale-125 text-red-500 hover:text-red-700"
                title="Supprimer"
                @click="openDeleteConfirm(patient.id)"
              >
                🗑
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredPatients.length === 0" class="py-12 text-center text-gray-400 italic">
        Aucun patient trouvé...
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200"
        @click.stop
      >
        <div class="flex justify-between items-center p-5 border-b">
          <h2 class="text-xl font-bold text-gray-800">
            {{ isEditMode ? 'Modifier le patient' : 'Nouveau patient' }}
          </h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
        </div>

        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-sm font-bold text-gray-700">Prénom</label>
              <input
                v-model="form.firstName"
                type="text"
                class="border rounded-md p-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                :class="errors.firstName ? 'border-red-500' : 'border-gray-300'"
                @input="clearError('firstName')"
              />
              <span v-if="errors.firstName" class="text-red-500 text-xs">{{
                errors.firstName
              }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-bold text-gray-700">Nom</label>
              <input
                v-model="form.lastName"
                type="text"
                class="border rounded-md p-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                :class="errors.lastName ? 'border-red-500' : 'border-gray-300'"
                @input="clearError('lastName')"
              />
              <span v-if="errors.lastName" class="text-red-500 text-xs">{{ errors.lastName }}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-sm font-bold text-gray-700">Genre</label>
              <select
                v-model="form.gender"
                class="border border-gray-300 rounded-md p-2.5 bg-white"
                @change="clearError('gender')"
              >
                <option value="">Sélectionnez</option>
                <option value="H">Homme</option>
                <option value="F">Femme</option>
              </select>
              <span v-if="errors.gender" class="text-red-500 text-xs">{{ errors.gender }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-bold text-gray-700">Téléphone</label>
              <input
                v-model="form.phone"
                type="text"
                placeholder="06..."
                class="border rounded-md p-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                :class="errors.phone ? 'border-red-500' : 'border-gray-300'"
                @input="clearError('phone')"
              />
              <span v-if="errors.phone" class="text-red-500 text-xs">{{ errors.phone }}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-sm font-bold text-gray-700">Groupe Sanguin</label>
              <select
                v-model="form.bloodGroup"
                class="border border-gray-300 rounded-md p-2.5 bg-white"
              >
                <option v-for="bg in bloodGroupOptions" :key="bg" :value="bg">{{ bg }}</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-bold text-gray-700">Chambre</label>
              <input
                v-model="form.room"
                type="text"
                placeholder="Numero de chambre."
                class="border rounded-md p-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                :class="errors.room ? 'border-red-500' : 'border-gray-300'"
                @input="clearError('room')"
              />
              <span v-if="errors.room" class="text-red-500 text-xs">{{ errors.room }}</span>
            </div>

            <!-- <div class="flex flex-col gap-1">
              <label class="text-sm font-bold text-gray-700">Doctor</label>
              <select
                v-model="form.doctor"
                class="border border-gray-300 rounded-md p-2.5 bg-white"
                @change="clearError('doctor')"
              >
                <option v-for="DC in doctorOptions" :key="DC" :value="DC">{{ DC }}</option>
              </select>
              <span v-if="errors.doctor" class="text-red-500 text-xs">{{ errors.doctor }}</span>
            </div> -->

            <div class="flex flex-col gap-1">
              <label class="text-sm font-bold text-gray-700">Statut</label>
              <select
                v-model="form.status"
                class="border border-gray-300 rounded-md p-2.5 bg-white"
              >
                <option v-for="st in statusOptions" :key="st" :value="st">{{ st }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 p-5 bg-gray-50 border-t">
          <button
            @click="closeModal"
            class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors"
          >
            Annuler
          </button>
          <button
            @click="savePatient"
            class="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 shadow-md"
          >
            {{ isEditMode ? 'Modifier' : 'Créer' }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showViewModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      @click="closeViewModal"
    >
      <div class="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden" @click.stop>
        <div class="p-5 border-b bg-gray-50 flex justify-between items-center">
          <h2 class="text-xl font-bold text-gray-800">Dossier Patient</h2>
          <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div class="p-6 space-y-4" v-if="viewingPatient">
          <div
            v-for="(val, key) in {
              Nom: viewingPatient.firstName + ' ' + viewingPatient.lastName,
              Genre: viewingPatient.gender === 'H' ? 'Homme' : 'Femme',
              Tél: viewingPatient.phone,
              Sang: viewingPatient.bloodGroup,
              Médecin: viewingPatient.doctor || 'Non assigné',
              Chambre: viewingPatient.room || 'N/A',
            }"
            :key="key"
            class="flex justify-between border-b border-gray-50 pb-2"
          >
            <span class="text-gray-500 font-medium">{{ key }}</span>
            <span class="text-gray-900 font-bold">{{ val }}</span>
          </div>
        </div>
        <div class="p-4 flex justify-center border-t">
          <button
            @click="closeViewModal"
            class="w-full py-2 bg-emerald-600 text-white rounded-lg font-bold"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      @click="closeDeleteConfirm"
    >
      <div class="bg-white rounded-xl w-full max-w-sm p-6 shadow-2xl text-center" @click.stop>
        <div
          class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold"
        >
          !
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">Supprimer le patient ?</h2>
        <p class="text-gray-500 mb-6 italic text-sm">
          Cette action est définitive et ne pourra pas être annulée.
        </p>
        <div class="flex gap-3">
          <button
            @click="closeDeleteConfirm"
            class="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-bold"
          >
            Non, garder
          </button>
          <button
            @click="confirmDelete"
            class="flex-1 py-2.5 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 shadow-lg transition-all active:scale-95"
          >
            Oui, supprimer
          </button>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-y-10 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 z-[2000] flex items-center gap-3 rounded-lg px-6 py-4 font-bold text-white shadow-2xl"
        :class="toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-600'"
      >
        <span>{{ toast.type === 'error' ? '❌' : '✅' }}</span>
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>
