<script setup>
import { ref, computed } from 'vue'
import { patients } from '@/services/patientService'
import { doctors } from '@/services/doctorService'
import { addAppointment, appointments } from '@/services/appointmentService'

const emit = defineEmits(['close'])

const patientId = ref('')
const doctorId = ref('')
const date = ref('')
const time = ref('')
const status = ref('En attente')

const errors = ref({})

const availableDoctors = computed(() =>
    doctors.value.filter(d => d.available)
)

/*
|--------------------------------------------------------------------------
| VALIDATION
|--------------------------------------------------------------------------
*/

const validateForm = () => {
    errors.value = {}

    if (!patientId.value) errors.value.patient = 'Patient obligatoire'
    if (!doctorId.value) errors.value.doctor = 'Médecin obligatoire'
    if (!date.value) errors.value.date = 'Date obligatoire'
    if (!time.value) errors.value.time = 'Heure obligatoire'

    if (!date.value || !time.value) return false

    const now = new Date()
    const selectedDateTime = new Date(`${date.value}T${time.value}`)

    // ❌ Date/heure passée
    if (selectedDateTime < now) {
        errors.value.date = 'Impossible de choisir une date ou heure passée'
    }

    // ❌ Plage horaire (8h - 18h)
    const hour = parseInt(time.value.split(':')[0])
    if (hour < 8 || hour >= 18) {
        errors.value.time = 'Horaire autorisé : 08h - 18h'
    }

    // ❌ Conflit médecin
    const doctorConflict = appointments.value.find(a =>
        a.doctorId === doctorId.value &&
        a.date === date.value &&
        a.time === time.value
    )

    if (doctorConflict) {
        errors.value.doctor = 'Ce médecin a déjà un rendez-vous à cette heure'
    }

    // ❌ Conflit patient
    const patientConflict = appointments.value.find(a =>
        a.patientId === patientId.value &&
        a.date === date.value &&
        a.time === time.value
    )

    if (patientConflict) {
        errors.value.patient = 'Ce patient a déjà un rendez-vous à cette heure'
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

    addAppointment({
        patientId: patientId.value,
        doctorId: doctorId.value,
        date: date.value,
        time: time.value,
        status: status.value
    })

    emit('close')
}
</script>


<template>
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">

        <h2 class="text-2xl font-bold mb-8 text-gray-800">
            Nouveau Rendez-vous
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <!-- Patient -->
            <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-1">Patient</label>
                <select v-model="patientId"
                    class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#108565] focus:outline-none">
                    <option disabled value="">Sélectionner un patient</option>
                    <option v-for="p in patients" :key="p.id" :value="p.id">
                        {{ p.firstName }} {{ p.lastName }}
                    </option>
                </select>
                <p v-if="errors.patient" class="text-red-500 text-xs mt-1">
                    {{ errors.patient }}
                </p>
            </div>

            <!-- Médecin -->
            <div>
                <label class="block text-sm font-medium mb-1">Médecin</label>
                <select v-model="doctorId"
                    class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#108565] focus:outline-none">
                    <option disabled value="">Sélectionner un médecin</option>
                    <option v-for="d in availableDoctors" :key="d.id" :value="d.id">
                        {{ d.name }}
                    </option>
                </select>
                <p v-if="errors.doctor" class="text-red-500 text-xs mt-1">
                    {{ errors.doctor }}
                </p>
            </div>

            <!-- Statut -->
            <div>
                <label class="block text-sm font-medium mb-1">Statut</label>
                <select v-model="status"
                    class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#108565] focus:outline-none">
                    <option>En attente</option>
                    <option disabled>Confirmé</option>
                </select>
            </div>

            <!-- Date -->
            <div>
                <label class="block text-sm font-medium mb-1">Date</label>
                <input v-model="date" type="date"
                    class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#108565] focus:outline-none" />
                <p v-if="errors.date" class="text-red-500 text-xs mt-1">
                    {{ errors.date }}
                </p>
            </div>

            <!-- Heure -->
            <div>
                <label class="block text-sm font-medium mb-1">Heure</label>
                <input v-model="time" type="time"
                    class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#108565] focus:outline-none" />
                <p v-if="errors.time" class="text-red-500 text-xs mt-1">
                    {{ errors.time }}
                </p>
            </div>

        </div>

        <!-- Boutons -->
        <div class="flex justify-end gap-4 mt-10">
            <button @click="$emit('close')"
                class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                Annuler
            </button>

            <button @click="handleSubmit"
                class="px-6 py-2 bg-[#108565] text-white rounded-lg font-medium hover:bg-[#0d6b50] transition">
                Enregistrer
            </button>
        </div>

    </div>
</template>
