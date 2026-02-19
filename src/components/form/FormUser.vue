<script setup>
import { ref, computed } from 'vue'
import { addUser } from '@/services/userService'
import { getDoctors, updateDoctor } from '@/services/doctorService'
import { getReceptionists } from '@/services/receptionistService'

const emit = defineEmits(['close'])

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('')
const selectedProfile = ref('')

const doctors = getDoctors()
const receptionists = getReceptionists()

// 🔥 Médecins sans user
const availableDoctors = computed(() =>
  doctors.value.filter(d => !d.userId)
)

// 🔥 Receptionnistes sans user
const availableReceptionists = computed(() =>
  receptionists.value.filter(r => !r.userId)
)

function handleSubmit() {

  console.log(selectedProfile.value);


  const newUser = {
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value
    // id
    // createAt
  }

  addUser(newUser)


  if (role.value === 'doctor') {
    const doctor = doctors.value.find(d => d.id === selectedProfile.value)


    if (doctor) {
    doctor.userId = newUser.id
     updateDoctor(doctor);
    }

  }

  if (role.value === 'receptioniste') {
    const receptionist = receptionists.value.find(r => r.id === selectedProfile.value)
    if (receptionist) {
      receptionist.userId = newUser.id
     updateDoctor(receptionist);

    }
  }

  emit('close')
}
</script>
<template>
  <div>

    <h2 class="text-lg font-bold mb-4">Nouvel Utilisateur</h2>

    <input v-model="name" placeholder="Pseudo"
      class="border p-2 w-full mb-3 rounded"/>

    <input v-model="email" placeholder="Email"
      class="border p-2 w-full mb-3 rounded"/>

    <input type="password" v-model="password"
      placeholder="Mot de passe"
      class="border p-2 w-full mb-3 rounded"/>

    <select v-model="role"
      class="border p-2 w-full mb-3 rounded">
      <option disabled value="">Choisir un rôle</option>
      <option value="admin">Administrateur</option>
      <option value="doctor">Médecin</option>
      <option value="receptioniste">Réceptionniste</option>
    </select>

    <!-- 🔥 Sélection dynamique -->
    <select
      v-if="role === 'doctor'"
      v-model="selectedProfile"
      class="border p-2 w-full mb-3 rounded"
    >
      <option disabled value="">Choisir un médecin</option>
      <option
        v-for="doc in availableDoctors"
        :key="doc.id"
        :value="doc.id"
      >
        {{ doc.name }}
      </option>
    </select>

    <select
      v-if="role === 'receptioniste'"
      v-model="selectedProfile"
      class="border p-2 w-full mb-3 rounded"
    >
      <option disabled value="">Choisir un réceptionniste</option>
      <option
        v-for="rec in availableReceptionists"
        :key="rec.id"
        :value="rec.id"
      >
        {{ rec.name }}
      </option>
    </select>

    <div class="flex justify-end gap-3">
      <button
        class="bg-gray-300 px-4 py-2 rounded"
        @click="$emit('close')"
      >
        Annuler
      </button>

      <button
        class="bg-green-600 text-white px-4 py-2 rounded"
        @click="handleSubmit"
      >
        Enregistrer
      </button>
    </div>

  </div>
</template>
