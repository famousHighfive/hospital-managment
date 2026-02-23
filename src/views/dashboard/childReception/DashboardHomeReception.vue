<script setup>
import { computed } from 'vue'
import { patients } from '@/services/patientService'
import { doctors } from '@/services/doctorService'
import { appointments } from '@/services/appointmentService'
import { rooms } from '@/services/roomService'

/* ================================
   PATIENTS
================================ */
const totalPatient = computed(() => patients.value.length)

const totalPatientHospitalise = computed(() =>
  patients.value.filter(p => p.status === 'Hospitalisé').length
)

const totalPatientConsultation = computed(() =>
  patients.value.filter(p => p.status === 'En consultation').length
)

const totalPatientSorti = computed(() =>
  patients.value.filter(p => p.status === 'Sorti').length
)

/* ================================
   DOCTORS
================================ */
const totalDoctors = computed(() => doctors.value.length)

const doctorsAvailable = computed(() =>
  doctors.value.filter(d => d.available).length
)

/* ================================
   APPOINTMENTS
================================ */
const today = new Date().toISOString().split('T')[0]

const todayAppointments = computed(() =>
  appointments.value.filter(a => a.date === today).length
)

const confirmedAppointments = computed(() =>
  appointments.value.filter(a => a.status === 'Confirmé').length
)

/* ================================
   ROOMS
================================ */
const totalRooms = computed(() => rooms.value.length)

const occupiedRooms = computed(() =>
  rooms.value.filter(r => r.currentOccupants > 0).length
)

const roomOccupationRate = computed(() => {
  if (totalRooms.value === 0) return 0
  return Math.round((occupiedRooms.value / totalRooms.value) * 100)
})

/* ================================
   RECENT ACTIVITY (Basique)
================================ */
const recentPatients = computed(() =>
  [...patients.value]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
)

</script>

<template>
  <div class="space-y-8 p-4">

    <!-- Title -->
    <div>
      <h2 class="text-2xl font-bold text-gray-800">Dashboard Receptionniste</h2>
      <p class="text-gray-500">Vue d'ensemble de l'hôpital</p>
    </div>

    <!-- ================= STATS ================= -->
    <div class="grid grid-cols-4 gap-6">

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">Total Patients</p>
        <h3 class="text-3xl font-bold mt-2">{{ totalPatient }}</h3>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">Hospitalisés</p>
        <h3 class="text-3xl font-bold mt-2 text-red-500">
          {{ totalPatientHospitalise }}
        </h3>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">Médecins</p>
        <h3 class="text-3xl font-bold mt-2">
          {{ totalDoctors }}
        </h3>
        <p class="text-sm text-gray-400">
          {{ doctorsAvailable }} disponibles
        </p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">RDV Aujourd'hui</p>
        <h3 class="text-3xl font-bold mt-2 text-green-500">
          {{ todayAppointments }}
        </h3>
      </div>

    </div>

    <!-- ================= SECOND ROW ================= -->
    <div class="grid grid-cols-4 gap-6">

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">En consultation</p>
        <h3 class="text-3xl font-bold mt-2 text-yellow-500">
          {{ totalPatientConsultation }}
        </h3>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">Sortis</p>
        <h3 class="text-3xl font-bold mt-2 text-gray-500">
          {{ totalPatientSorti }}
        </h3>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">Chambres Occupées</p>
        <h3 class="text-3xl font-bold mt-2">
          {{ occupiedRooms }} / {{ totalRooms }}
        </h3>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">Taux d'occupation</p>
        <h3 class="text-3xl font-bold mt-2">
          {{ roomOccupationRate }}%
        </h3>
      </div>

    </div>

    <!-- ================= APPOINTMENTS STATUS ================= -->
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <h3 class="font-semibold mb-4">Statut des Rendez-vous</h3>

      <div class="flex justify-between text-center">
        <div>
          <p class="text-gray-500">Confirmés</p>
          <h4 class="text-2xl font-bold text-green-600">
            {{ confirmedAppointments }}
          </h4>
        </div>

        <div>
          <p class="text-gray-500">Total RDV</p>
          <h4 class="text-2xl font-bold">
            {{ appointments.length }}
          </h4>
        </div>
      </div>
    </div>

    <!-- ================= RECENT ACTIVITY ================= -->
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <h3 class="font-semibold mb-4">Patients récents</h3>

      <table class="w-full text-left">
        <thead class="border-b">
          <tr class="text-gray-500 text-sm">
            <th class="py-3">Nom</th>
            <th>Status</th>
            <th>Chambre</th>
          </tr>
        </thead>

        <tbody class="divide-y">
          <tr v-for="patient in recentPatients" :key="patient.id">
            <td class="py-4">
              {{ patient.firstName }} {{ patient.lastName }}
            </td>
            <td>{{ patient.status }}</td>
            <td>{{ patient.room }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
