<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { addPatient, updatePatient } from '@/services/patientService'
import { doctors } from '@/services/doctorService'
import { rooms } from '@/services/roomService'

const props = defineProps({
  patient: Object
})

onMounted(() => {
  if (props.patient) {
    firstName.value = props.patient.firstName
    lastName.value = props.patient.lastName
    gender.value = props.patient.gender
    phone.value = props.patient.phone
    bloodGroup.value = props.patient.bloodGroup
    doctor.value = props.patient.doctorId
    room.value = props.patient.room
    status.value = props.patient.status
  }
})

const emit = defineEmits(['close'])

const firstName = ref('')
const lastName = ref('')
const gender = ref('')
const phone = ref('')
const bloodGroup = ref('')
const doctor = ref('')
const room = ref('')
const status = ref('En consultation')

const errors = ref({})

// Docteurs disponibles
const availableDoctors = computed(() => {
    return doctors.value.filter(doc => doc.available)
})

// Chambres libres
const availableRooms = computed(() => {
    return rooms.value.filter(r => r.currentOccupants < r.capacity)
})

/*
|--------------------------------------------------------------------------
| REGLES AUTOMATIQUES SELON STATUS
|--------------------------------------------------------------------------
*/

// Si consultation → pas de chambre
watch(status, (newStatus) => {
    if (newStatus === 'En consultation') {
        room.value = ''
    }
})


const validateForm = () => {
    errors.value = {}

    // Texte uniquement
    const textRegex = /^[A-Za-zÀ-ÿ\s-]+$/

    if (!firstName.value || !textRegex.test(firstName.value)) {
        errors.value.firstName = 'Prénom invalide'
    }

    if (!lastName.value || !textRegex.test(lastName.value)) {
        errors.value.lastName = 'Nom invalide'
    }

    // Téléphone chiffres uniquement
    const phoneRegex = /^[0-9]+$/
    if (!phone.value || !phoneRegex.test(phone.value)) {
        errors.value.phone = 'Numéro invalide (chiffres uniquement)'
    }

    if (!gender.value) {
        errors.value.gender = 'Genre obligatoire'
    }

    if (!doctor.value) {
        errors.value.doctor = 'Médecin obligatoire'
    }

    // Si hospitalisé → chambre obligatoire
    if (status.value === 'Hospitalisé' && !room.value) {
        errors.value.room = 'Chambre obligatoire pour hospitalisation'
    }

    // Si consultation → pas de chambre autorisée
    if (status.value === 'En consultation' && room.value) {
        errors.value.room = 'Pas de chambre en consultation'
    }

    return Object.keys(errors.value).length === 0
}

/*
|--------------------------------------------------------------------------
| SUBMIT
|--------------------------------------------------------------------------
*/

const handleSubmit = () => {

  if (!validateForm()) return

  const patientData = {
    firstName: firstName.value,
    lastName: lastName.value,
    gender: gender.value,
    phone: phone.value,
    bloodGroup: bloodGroup.value,
    doctorId: doctor.value,
    room: status.value === 'Hospitalisé' ? room.value : null,
    status: status.value
  }

  if (props.patient) {
    // 🔥 MODE UPDATE
    updatePatient({
      id: props.patient.id,
      ...patientData
    })
  } else {
    // 🔥 MODE ADD
    addPatient(patientData)
  }

  emit('close')
}

</script>

<template>
    <div class="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">

        <h2 class="text-2xl font-bold mb-8 text-gray-800">
  {{ patient ? "Modifier le patient" : "Ajouter un patient" }}
</h2>


        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <!-- Prénom -->
            <div>
                <label class="block text-sm font-medium mb-1">Prénom</label>
                <input v-model="firstName" type="text" placeholder="Ex: Jean"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
                <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">
                    {{ errors.firstName }}
                </p>
            </div>

            <!-- Nom -->
            <div>
                <label class="block text-sm font-medium mb-1">Nom</label>
                <input v-model="lastName" type="text" placeholder="Ex: Dupont"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
                <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">
                    {{ errors.lastName }}
                </p>
            </div>

            <!-- Téléphone -->
            <div>
                <label class="block text-sm font-medium mb-1">Téléphone</label>
                <input v-model="phone" type="tel" inputmode="numeric" pattern="[0-9]*" placeholder="Ex: 0612345678"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
                <p v-if="errors.phone" class="text-red-500 text-xs mt-1">
                    {{ errors.phone }}
                </p>
            </div>

            <!-- Genre -->
            <div>
                <label class="block text-sm font-medium mb-1">Genre</label>
                <select v-model="gender"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
                    <option disabled value="">Sélectionner</option>
                    <option value="H">Homme</option>
                    <option value="F">Femme</option>
                </select>
                <p v-if="errors.gender" class="text-red-500 text-xs mt-1">
                    {{ errors.gender }}
                </p>
            </div>

            <!-- Groupe sanguin -->
            <div>
                <label class="block text-sm font-medium mb-1">Groupe sanguin</label>
                <select v-model="bloodGroup"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
                    <option disabled value="">Sélectionner</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                </select>
            </div>

            <!-- Médecin -->
            <div>
                <label class="block text-sm font-medium mb-1">Médecin</label>
                <select v-model="doctor" :disabled="availableDoctors.length === 0"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none disabled:bg-gray-100">
                    <option disabled value="">Sélectionner un médecin</option>
                    <option v-for="doc in availableDoctors" :key="doc.id" :value="doc.id">
                        {{ doc.name }} ({{ doc.speciality }})
                    </option>
                </select>

                <p v-if="availableDoctors.length === 0" class="text-orange-500 text-xs mt-1">
                    Aucun médecin disponible
                </p>

                <p v-if="errors.doctor" class="text-red-500 text-xs mt-1">
                    {{ errors.doctor }}
                </p>
            </div>

            <!-- Chambre -->
            <div>
                <label class="block text-sm font-medium mb-1">Chambre</label>
                <select v-model="room" :disabled="status === 'En consultation'"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none disabled:bg-gray-100">
                    <option disabled value="">Sélectionner une chambre</option>
                    <option v-for="r in availableRooms" :key="r.id" :value="r.number">
                        Chambre {{ r.number }}
                    </option>
                </select>

                <p v-if="errors.room" class="text-red-500 text-xs mt-1">
                    {{ errors.room }}
                </p>
            </div>

            <!-- Statut -->
            <div>
                <label class="block text-sm font-medium mb-1">Statut</label>
                <select v-model="status"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
                    <option>En consultation</option>
                    <option>Hospitalisé</option>
                    <!-- <option>Sorti</option> -->
                </select>
            </div>

        </div>

        <!-- Bouton -->
<button
  @click="handleSubmit"
  class="mt-8 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
>
  {{ patient ? "Mettre à jour" : "Enregistrer le patient" }}
</button>

    </div>
</template>
