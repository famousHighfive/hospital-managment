<script setup>
import { ref, computed } from 'vue'
import { appointments, deleteAppointment } from '@/services/appointmentService'
import { patients } from '@/services/patientService'
import { doctors } from '@/services/doctorService'
import BaseModal from '@/components/ui/BaseModal.vue'
import FormAppointment from '@/components/form/FormAppointment.vue'

const showModal = ref(false) // On utilise cette variable partout
const search = ref('')

const getPatientName = (id) => {
    const p = patients.value.find(p => p.id === id)
    return p ? `${p.firstName} ${p.lastName}` : 'Inconnu'
}

const getDoctorName = (id) => {
    const d = doctors.value.find(d => d.id === id)
    return d ? d.name : 'Inconnu'
}

const filteredAppointments = computed(() => {
    return appointments.value.filter(app =>
        getPatientName(app.patientId).toLowerCase().includes(search.value.toLowerCase())
    )
})
</script>

<template>
    <div class="p-8 bg-gray-50 min-h-screen">
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-3xl font-bold text-gray-800">Gestion des Rendez-vous</h1>
                <p class="text-gray-500">Consulter et gérer le planning</p>
            </div>

            <button @click="showModal = true"
                class="flex items-center gap-2 bg-[#108565] text-white px-5 py-2.5 rounded-lg hover:bg-[#0d6d53] transition shadow-md font-semibold">
                <span class="text-xl">+</span> Nouveau RDV
            </button>
        </div>

        <!-- Recherche -->
        <div class="mb-4">
            <input v-model="search" type="text" placeholder="Rechercher un patient..."
                class="w-full p-3 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <!-- Table -->
        <div class="bg-white rounded-xl shadow overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-gray-100 text-gray-600 uppercase text-sm">
                    <tr>
                        <th class="p-4">Patient</th>
                        <th>Médecin</th>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rdv in filteredAppointments" :key="rdv.id" class="border-t hover:bg-gray-50 transition">
                        <td class="p-4 font-medium">{{ getPatientName(rdv.patientId) }}</td>
                        <td class="text-blue-600">{{ getDoctorName(rdv.doctorId) }}</td>
                        <td class="font-mono">{{ rdv.date }}</td>
                        <td class="font-mono">{{ rdv.time }}</td>
                        <td>
                            <span :class="{
                                'px-3 py-1 text-xs font-bold rounded-full': true,
                                'bg-green-100 text-green-700': rdv.status === 'Confirmé',
                                'bg-yellow-100 text-yellow-700': rdv.status === 'En attente',
                                'bg-red-100 text-red-700': rdv.status === 'Annulé'
                            }">{{ rdv.status }}</span>
                        </td>
                        <td class="p-4">
                            <button @click="deleteAppointment(rdv.id)"
                                class="text-red-500 hover:text-red-700">🗑</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <BaseModal v-model="showModal">
            <FormAppointment @close="showModal = false" />
        </BaseModal>
    </div>
</template>
