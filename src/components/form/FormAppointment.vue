<script setup>
import { ref, computed, watch } from 'vue'
import { patients } from '@/services/patientService'
import { doctors } from '@/services/doctorService'
import { addAppointment, appointments } from '@/services/appointmentService'
import { currentUser } from '@/services/authService'
import { users } from '@/services/userService'

const props = defineProps({
    appointment: Object // <-- prop pour l’édition
})

const role = computed(() => currentUser.value?.role)
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

/* ================================
   OWN DOCTOR DATA (SÉCURISÉ)
================================ */
const doctorUser = computed(() =>
    users.value.find(u => u.id === currentUser.value?.id)
)

const docId = computed(() =>
    doctors.value.find(d => d.userId === doctorUser.value?.id)
)

const myPatients = computed(() => {
    if (!docId.value) return []
    return patients.value.filter(p => p.doctorId === docId.value.id)
})

/* 🔥 Auto-assign doctorId si doctor connecté */
watch(docId, (newDoc) => {
    if (role.value === 'doctor' && newDoc) {
        doctorId.value = newDoc.id
    }
}, { immediate: true })

/* 🔥 Pré-remplir les champs si édition */
watch(() => props.appointment, (newVal) => {
    if (newVal) {
        patientId.value = newVal.patientId
        doctorId.value = newVal.doctorId
        date.value = newVal.date
        time.value = newVal.time
        status.value = newVal.status
    } else {
        patientId.value = ''
        doctorId.value = role.value === 'doctor' && docId.value ? docId.value.id : ''
        date.value = ''
        time.value = ''
        status.value = 'En attente'
    }
}, { immediate: true })

/*
|-----------------------------------------------------------------------
| VALIDATION
|-----------------------------------------------------------------------
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
        a.time === time.value &&
        (!props.appointment || a.id !== props.appointment.id)
    )

    if (doctorConflict) {
        errors.value.doctor = 'Ce médecin a déjà un rendez-vous à cette heure'
    }

    // ❌ Conflit patient
    const patientConflict = appointments.value.find(a =>
        a.patientId === patientId.value &&
        a.date === date.value &&
        a.time === time.value &&
        (!props.appointment || a.id !== props.appointment.id)
    )

    if (patientConflict) {
        errors.value.patient = 'Ce patient a déjà un rendez-vous à cette heure'
    }

    return Object.keys(errors.value).length === 0
}

/*
|-----------------------------------------------------------------------
| SUBMIT
|-----------------------------------------------------------------------
*/
const handleSubmit = () => {
    if (!validateForm()) return

    const data = {
        patientId: patientId.value,
        doctorId: doctorId.value,
        date: date.value,
        time: time.value,
        status: status.value
    }

    if (props.appointment) {
        // 🔥 Modification
        const index = appointments.value.findIndex(a => a.id === props.appointment.id)
        if (index !== -1) {
            appointments.value[index] = { id: props.appointment.id, ...data }
            localStorage.setItem('rdv', JSON.stringify(appointments.value))
        }
    } else {
        // 🔥 Création
        addAppointment(data)
    }

    emit('close')
}
</script>

<template>
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">

        <h2 class="text-2xl font-bold mb-8 text-gray-800">
            {{ props.appointment ? 'Modifier Rendez-vous' : 'Nouveau Rendez-vous' }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <!-- Patient -->
            <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-1">Patient</label>
                <select v-model="patientId"
                    class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#108565] focus:outline-none">
                    <option disabled value="">Sélectionner un patient</option>

                    <template v-if="role === 'doctor'">
                        <option v-for="p in myPatients" :key="p.id" :value="p.id">
                            {{ p.firstName }} {{ p.lastName }}
                        </option>
                    </template>

                    <template v-else>
                        <option v-for="p in patients" :key="p.id" :value="p.id">
                            {{ p.firstName }} {{ p.lastName }}
                        </option>
                    </template>
                </select>

                <p v-if="errors.patient" class="text-red-500 text-xs mt-1">
                    {{ errors.patient }}
                </p>
            </div>

            <!-- Médecin -->
            <div>
                <label class="block text-sm font-medium mb-1">Médecin</label>
                <select v-model="doctorId" :disabled="role === 'doctor'"
                    class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#108565] focus:outline-none disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-100 disabled:text-gray-700">

                    <template v-if="role === 'doctor' && docId">
                        <option :value="docId.id">
                            {{ docId.name }}
                        </option>
                    </template>

                    <template v-else>
                        <option value="" disabled>Sélectionner un médecin</option>
                        <option v-for="d in availableDoctors" :key="d.id" :value="d.id">
                            {{ d.name }}
                        </option>
                    </template>
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
                    <option>Confirmé</option>
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

        <div class="flex justify-end gap-4 mt-10">
            <button @click="$emit('close')"
                class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                Annuler
            </button>

            <button @click="handleSubmit"
                class="px-6 py-2 bg-[#108565] text-white rounded-lg font-medium hover:bg-[#0d6b50] transition">
                {{ props.appointment ? 'Modifier' : 'Enregistrer' }}
            </button>
        </div>

    </div>
</template>