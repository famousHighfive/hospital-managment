<script setup>
import { computed } from 'vue'
import { appointments } from '@/services/appointmentService'
import { currentUser } from '@/services/authService'
import { doctors } from '@/services/doctorService'
import { patients } from '@/services/patientService'
import { users } from '@/services/userService'

/* ================================
   DOCTEUR CONNECTÉ
================================ */

const doctorUser = computed(() =>
  users.value.find(u => u.id === currentUser.value?.id) || null
)

const doctor = computed(() =>
  doctors.value.find(d => d.userId === doctorUser.value?.id) || null
)

/* ================================
   PATIENTS DU DOCTEUR
================================ */

const myPatients = computed(() => {
  if (!doctor.value) return []
  return patients.value.filter(p => p.doctorId === doctor.value.id)
})

const myHospitalizedPatients = computed(() =>
  myPatients.value.filter(p => p.status === 'Hospitalisé')
)

/* ================================
   RENDEZ-VOUS DU DOCTEUR
================================ */

const myAppointments = computed(() => {
  if (!doctor.value) return []
  return appointments.value.filter(a => a.doctorId === doctor.value.id)
})

const today = new Date().toISOString().split('T')[0]

const todayAppointments = computed(() =>
  myAppointments.value.filter(a => a.date === today)
)

const upcomingAppointments = computed(() => {
  return myAppointments.value
    .filter(a => a.date >= today)
    .map(a => {
      const patient = patients.value.find(p => p.id === a.patientId)
      return {
        ...a,
        patientName: patient
          ? `${patient.firstName} ${patient.lastName}`
          : 'Patient inconnu'
      }
    })
    .sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`))
})
</script>

<template>
  <div class="space-y-8 p-6">

    <!-- HEADER -->
    <div>
      <h2 class="text-2xl font-bold text-gray-800">Dashboard Médecin</h2>
      <p class="text-gray-500">
        Bienvenue Dr. {{ currentUser?.name || '...' }}
      </p>
    </div>

    <!-- STATS -->
    <div class="grid grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">Mes Patients</p>
        <h3 class="text-3xl font-bold mt-2">{{ myPatients.length }}</h3>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">Hospitalisés</p>
        <h3 class="text-3xl font-bold mt-2 text-red-500">{{ myHospitalizedPatients.length }}</h3>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">RDV Aujourd'hui</p>
        <h3 class="text-3xl font-bold mt-2 text-green-500">{{ todayAppointments.length }}</h3>
      </div>
    </div>

    <!-- PROCHAINS RDV -->
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <h3 class="font-semibold mb-4">Prochains Rendez-vous</h3>
      <table class="w-full text-left">
        <thead class="border-b">
          <tr class="text-gray-500 text-sm">
            <th class="py-3">Patient</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="rdv in upcomingAppointments" :key="rdv.id">
            <td class="py-4">{{ rdv.patientName }}</td>
            <td>{{ rdv.date }}</td>
            <td>{{ rdv.time }}</td>
            <td>
              <span :class="rdv.status === 'Confirmé' ? 'text-green-600' : 'text-yellow-500'">
                {{ rdv.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PATIENTS HOSPITALISÉS -->
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <h3 class="font-semibold mb-4">Mes Patients Hospitalisés</h3>
      <table class="w-full text-left">
        <thead class="border-b">
          <tr class="text-gray-500 text-sm">
            <th class="py-3">Nom</th>
            <th>Chambre</th>
            <th>Téléphone</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="patient in myHospitalizedPatients" :key="patient.id">
            <td class="py-4">{{ patient.firstName }} {{ patient.lastName }}</td>
            <td>{{ patient.room }}</td>
            <td>{{ patient.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>