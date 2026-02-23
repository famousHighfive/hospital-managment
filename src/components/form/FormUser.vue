<script setup>
import { ref, computed, watch } from 'vue'
import { addUser, users } from '@/services/userService'
import { getDoctors, updateDoctor } from '@/services/doctorService'
import { getReceptionists, updateReceptionist } from '@/services/receptionistService'

const emit = defineEmits(['close'])
const props = defineProps({
  user: Object // si on édite, on reçoit l'utilisateur
})

const name = ref(props.user?.name || '')
const email = ref(props.user?.email || '')
const password = ref('')
const role = ref(props.user?.role || '')
const selectedProfile = ref(props.user?.profileId || '')

const errors = ref({})

const doctors = getDoctors()
const receptionists = getReceptionists()

// 🔥 Médecins disponibles (inclut le profil existant si édition)
const availableDoctors = computed(() =>
  doctors.value.filter(d => !d.userId || (props.user && d.userId === props.user.id))
)

// 🔥 Réceptionnistes disponibles (inclut le profil existant si édition)
const availableReceptionists = computed(() =>
  receptionists.value.filter(r => !r.userId || (props.user && r.userId === props.user.id))
)

function handleSubmit() {
  errors.value = {}

  // ----------------------------
  // Validation de base
  // ----------------------------
  if (!name.value) errors.value.name = "Le nom est obligatoire"
  if (!email.value) errors.value.email = "L'email est obligatoire"
  if (!password.value && !props.user) errors.value.password = "Le mot de passe est obligatoire"
  if (!role.value) errors.value.role = "Le rôle est obligatoire"

  // ----------------------------
  // Email déjà utilisé (hors édition)
  // ----------------------------
  const emailExists = users.value.some(
    u => u.email === email.value && u.id !== props.user?.id
  )
  if (emailExists) errors.value.email = "Cet email est déjà utilisé"

  // ----------------------------
  // Vérification profil selon rôle
  // ----------------------------
  if ((role.value === 'doctor' || role.value === 'receptioniste') && !selectedProfile.value)
    errors.value.profile = "Vous devez choisir un profil"

  if (Object.keys(errors.value).length > 0) return

  // ----------------------------
  // Création ou modification utilisateur
  // ----------------------------
  let createdUser
  if (props.user) {
    // Édition
    props.user.name = name.value
    props.user.email = email.value
    if (password.value) props.user.password = password.value
    props.user.role = role.value
    createdUser = props.user
  } else {
    // Ajout
    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value
    }
    createdUser = addUser(newUser)
  }

  // ----------------------------
  // Assignation au profil
  // ----------------------------
  if (role.value === 'doctor') {
    const doctor = doctors.value.find(d => d.id === selectedProfile.value)
    if (doctor) {
      doctor.userId = createdUser.id
      updateDoctor(doctor)
    }
  }

  if (role.value === 'receptioniste') {
    const receptionist = receptionists.value.find(r => r.id === selectedProfile.value)
    if (receptionist) {
      receptionist.userId = createdUser.id
      updateReceptionist(receptionist)
    }
  }

  emit('close')
}
</script>

<template>
  <div>
    <h2 class="text-lg font-bold mb-4">
      {{ props.user ? "Modifier Utilisateur" : "Nouvel Utilisateur" }}
    </h2>

    <input v-model="name" placeholder="Pseudo" class="border p-2 w-full mb-1 rounded" />
    <p v-if="errors.name" class="text-red-500 text-xs mb-2">{{ errors.name }}</p>

    <input v-model="email" placeholder="Email" class="border p-2 w-full mb-1 rounded" />
    <p v-if="errors.email" class="text-red-500 text-xs mb-2">{{ errors.email }}</p>

    <input type="password" v-model="password" placeholder="Mot de passe" class="border p-2 w-full mb-1 rounded" />
    <p v-if="errors.password" class="text-red-500 text-xs mb-2">{{ errors.password }}</p>

    <select v-model="role" class="border p-2 w-full mb-1 rounded">
      <option disabled value="">Choisir un rôle</option>
      <option value="admin">Administrateur</option>
      <option value="doctor">Médecin</option>
      <option value="receptioniste">Réceptionniste</option>
    </select>
    <p v-if="errors.role" class="text-red-500 text-xs mb-2">{{ errors.role }}</p>

    <!-- 🔥 Sélection dynamique -->
    <select v-if="role === 'doctor'" v-model="selectedProfile" class="border p-2 w-full mb-1 rounded">
      <option disabled value="">Choisir un médecin</option>
      <option v-for="doc in availableDoctors" :key="doc.id" :value="doc.id">{{ doc.name }}</option>
    </select>

    <select v-if="role === 'receptioniste'" v-model="selectedProfile" class="border p-2 w-full mb-1 rounded">
      <option disabled value="">Choisir un réceptionniste</option>
      <option v-for="rec in availableReceptionists" :key="rec.id" :value="rec.id">{{ rec.name }}</option>
    </select>
    <p v-if="errors.profile" class="text-red-500 text-xs mb-2">{{ errors.profile }}</p>

    <div class="flex justify-end gap-3 mt-3">
      <button class="bg-gray-300 px-4 py-2 rounded" @click="$emit('close')">Annuler</button>
      <button class="bg-green-600 text-white px-4 py-2 rounded" @click="handleSubmit">
        {{ props.user ? "Modifier" : "Enregistrer" }}
      </button>
    </div>
  </div>
</template>