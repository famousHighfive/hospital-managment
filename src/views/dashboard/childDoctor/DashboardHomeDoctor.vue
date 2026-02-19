<script setup>
import { currentUser } from '@/services/authService'

// Fake data (tu pourras connecter à tes services après)
const totalPatients = 2
const hospitalizedPatients = 1
const todayAppointments = 2
const consultationPatients = 1
const finishedPatients = 0

const upcomingAppointments = [
  {
    id: 1,
    patient: "Pierre Bernard",
    date: "16/02/2026",
    time: "09:00",
    status: "Confirmé"
  },
  {
    id: 2,
    patient: "Jean Dupont",
    date: "16/02/2026",
    time: "10:30",
    status: "Confirmé"
  }
]

const hospitalizedList = [
  {
    id: 1,
    name: "Jean Dupont",
    blood: "A+",
    room: "1",
    phone: "06 12 34 56 78"
  }
]
</script>

<template>
  <Header />

  <div class="space-y-8 p-8 bg-[#f4fef8] min-h-screen">

    <!-- TITLE -->
    <div>
      <h2 class="text-3xl font-bold text-[#13664c]">Dashboard Médecin</h2>
      <p class="text-gray-600">Bienvenue, {{ currentUser.name }}</p>
    </div>

    <!-- ================= STATS ================= -->
    <div class="grid grid-cols-4 gap-6">

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">Mes Patients</p>
        <h3 class="text-3xl font-bold mt-2 text-[#2e7d32]">
          {{ totalPatients }}
        </h3>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">Hospitalisés</p>
        <h3 class="text-3xl font-bold mt-2 text-red-500">
          {{ hospitalizedPatients }}
        </h3>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">RDV Aujourd'hui</p>
        <h3 class="text-3xl font-bold mt-2 text-green-600">
          {{ todayAppointments }}
        </h3>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">En consultation</p>
        <h3 class="text-3xl font-bold mt-2 text-yellow-500">
          {{ consultationPatients }}
        </h3>
      </div>

    </div>

    <!-- ================= SECOND ROW ================= -->
    <div class="grid grid-cols-4 gap-6">

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <p class="text-gray-500">Patients Sortis</p>
        <h3 class="text-3xl font-bold mt-2 text-gray-600">
          {{ finishedPatients }}
        </h3>
      </div>

    </div>

    <!-- ================= APPOINTMENTS ================= -->
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <h3 class="font-semibold mb-4 text-[#2e7d32]">
        Prochains Rendez-vous
      </h3>

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
          <tr
            v-for="rdv in upcomingAppointments"
            :key="rdv.id"
            class="hover:bg-gray-50"
          >
            <td class="py-4">{{ rdv.patient }}</td>
            <td>{{ rdv.date }}</td>
            <td>{{ rdv.time }}</td>
            <td class="text-green-600 font-semibold">
              {{ rdv.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ================= HOSPITALIZED ================= -->
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <h3 class="font-semibold mb-4 text-[#2e7d32]">
        Mes Patients Hospitalisés
      </h3>

      <table class="w-full text-left">
        <thead class="border-b">
          <tr class="text-gray-500 text-sm">
            <th class="py-3">Nom</th>
            <th>Groupe sanguin</th>
            <th>Chambre</th>
            <th>Téléphone</th>
          </tr>
        </thead>

        <tbody class="divide-y">
          <tr
            v-for="patient in hospitalizedList"
            :key="patient.id"
            class="hover:bg-gray-50"
          >
            <td class="py-4">{{ patient.name }}</td>
            <td>{{ patient.blood }}</td>
            <td>{{ patient.room }}</td>
            <td>{{ patient.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
