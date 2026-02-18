<script setup>
import { ref } from 'vue'
import { addPatient } from '@/services/patientService'

const emit = defineEmits(['close'])

const firstName = ref('')
const lastName = ref('')
const gender = ref('')
const phone = ref('')
const bloodGroup = ref('')
const doctor = ref('')
const room = ref('')
const status = ref('Hospitalisé')

const handleSubmit = () => {
    if (!firstName.value || !lastName.value || !gender.value) {
        alert('Veuillez remplir les champs obligatoires')
        return
    }

    addPatient({
        firstName: firstName.value,
        lastName: lastName.value,
        gender: gender.value,
        phone: phone.value,
        bloodGroup: bloodGroup.value,
        doctor: doctor.value,
        room: room.value,
        status: status.value
    })

    emit('close')
}
</script>

<template>
    <div>
        <h2 class="text-2xl font-bold mb-6">Ajouter un patient</h2>

        <div class="grid grid-cols-2 gap-4">

            <input v-model="firstName" placeholder="Prénom" class="p-2 border rounded" />

            <input v-model="lastName" placeholder="Nom" class="p-2 border rounded" />

            <select v-model="gender" class="p-2 border rounded">
                <option disabled value="">Genre</option>
                <option value="H">Homme</option>
                <option value="F">Femme</option>
            </select>

            <input v-model="phone" placeholder="Téléphone" class="p-2 border rounded" />

            <input v-model="bloodGroup" placeholder="Groupe sanguin" class="p-2 border rounded" />

            <input v-model="doctor" placeholder="Médecin" class="p-2 border rounded" />

            <input v-model="room" placeholder="Chambre" class="p-2 border rounded" />

            <select v-model="status" class="p-2 border rounded">
                <option>Hospitalisé</option>
                <option>En consultation</option>
                <option>Sorti</option>
            </select>

        </div>

        <button @click="handleSubmit" class="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Enregistrer
        </button>
    </div>
</template>
