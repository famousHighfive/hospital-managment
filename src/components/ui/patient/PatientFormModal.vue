<script setup>
import { computed, ref } from 'vue'
import { addPatient } from '@/services/patientService'
import { doctors } from '@/services/doctorService'
import { rooms } from '@/services/roomService'

const emit = defineEmits(['close'])

const firstName = ref('')
const lastName = ref('')
const gender = ref('')
const phone = ref('')
const bloodGroup = ref('')
const doctor = ref('')
const room = ref('')
const status = ref('Hospitalisé')

// Filtrer les docteurs ayant available: true
const availableDoctors = computed(() => {
    return doctors.value.filter(doc => doc.available)
})

// Filtrer les chambres ayant le statut "Libre"
const availableRooms = computed(() => {
    return rooms.value.filter(r => r.status === 'Libre')
})

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

            <select v-model="bloodGroup" class="p-2 border rounded w-full">
                <option disabled value="">Groupe sanguin</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
            </select>

            <select v-model="doctor" class="p-2 border rounded">
                <option disabled value="">Médecin dispo</option>
                <option v-for="doc in availableDoctors" :key="doc.id" :value="doc.name">
                    {{ doc.name }} ({{ doc.speciality }})
                </option>
            </select>

            <select v-model="room" class="p-2 border rounded">
                <option disabled value="">Chambre libre</option>
                <option v-for="r in availableRooms" :key="r.id" :value="r.number">
                    Chambre {{ r.number }} ({{ r.capacity }} lits)
                </option>
            </select>

            <select v-model="status" class="p-2 border rounded">
                <option>Hospitalisé</option>
                <option>En consultation</option>
                <option>Sorti</option>
            </select>

        </div>

        <button @click="handleSubmit" class="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Enregistrer
            Enregistrer Patient
        </button>
    </div>
</template>
