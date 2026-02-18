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

const availableDoctors = computed(() => doctors.value.filter(d => d.available))

const handleSubmit = () => {
    if (!patientId.value || !doctorId.value || !date.value || !time.value) {
        alert('Veuillez remplir tous les champs'); return
    }
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
    <div class="w-full">
        <h2 class="text-xl font-bold mb-6 text-gray-800">Nouveau Rendez-vous</h2>
        <div class="space-y-4 text-left">
            <div>
                <label class="block text-sm font-semibold mb-1">Patient</label>
                <select v-model="patientId" class="w-full p-3 bg-[#f8f9fa] rounded-lg outline-none">
                    <option disabled value="">Sélectionner un patient</option>
                    <option v-for="p in patients" :key="p.id" :value="p.id">{{ p.firstName }} {{ p.lastName }}</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-semibold mb-1">Médecin</label>
                <select v-model="doctorId" class="w-full p-3 bg-[#f8f9fa] rounded-lg outline-none">
                    <option disabled value="">Sélectionner un médecin</option>
                    <option v-for="d in availableDoctors" :key="d.id" :value="d.id">{{ d.name }}</option>
                </select>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <input v-model="date" type="date" class="p-3 bg-[#f8f9fa] rounded-lg outline-none" />
                <input v-model="time" type="time" class="p-3 bg-[#f8f9fa] rounded-lg outline-none" />
            </div>
            <div>
                <label class="block text-sm font-semibold mb-1">Statut</label>
                <select v-model="status" class="w-full p-3 bg-[#f8f9fa] rounded-lg outline-none">
                    <option>En attente</option>
                    <option disabled>Confirmé</option>
                </select>
            </div>
        </div>
        <div class="flex justify-end gap-3 mt-8">
            <button @click="$emit('close')" class="px-6 py-2 border rounded-lg">Annuler</button>
            <button @click="handleSubmit"
                class="px-6 py-2 bg-[#108565] text-white rounded-lg font-medium">Enregistrer</button>
        </div>
    </div>
</template>
