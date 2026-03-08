<script setup>
import { computed } from 'vue'
import { patients } from '@/services/patientService'
import { doctors } from '@/services/doctorService'
import { rooms } from '@/services/roomService'
import { appointments } from '@/services/appointmentService' // à créer si nécessaire

// Total patients
const totalPatients = computed(() => patients.value.length)

// Patients hospitalisés
const hospitalizedPatients = computed(() =>
  patients.value.filter(p => p.status === 'Hospitalisé').length
)

// Total médecins
const totalDoctors = computed(() => doctors.value.length)

// Rendez-vous aujourd'hui
const today = new Date().toISOString().slice(0, 10)
const todayAppointments = computed(() =>
  appointments.value.filter(a => a.date.startsWith(today)).length
)

// Chambres occupées
const occupiedRooms = computed(() =>
  rooms.value.filter(r => r.currentOccupants > 0).length
)

// Taux d’occupation
const totalRooms = computed(() => rooms.value.length)
const occupancyRate = computed(() =>
  totalRooms.value > 0 ? Math.round((occupiedRooms.value / totalRooms.value) * 100) : 0
)

// Rendez-vous par semaine
const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']

const appointmentsByWeek = computed(() => {
  const counts = {}
  weekDays.forEach(d => counts[d] = 0)
  appointments.value.forEach(a => {
    const day = new Date(a.date).getDay() // 0 = dimanche, 1 = lundi ...
    if (day >= 1 && day <= 5) {
      counts[weekDays[day - 1]] += 1
    }
  })
  return counts
})
</script>

<template>
  <div class="space-y-8 p-4">

    <!-- Stats principales -->
    <div class="grid grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-gray-500">Total Patients</h3>
        <p class="text-2xl font-bold mt-2">{{ totalPatients }}</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-gray-500">Patients hospitalisés</h3>
        <p class="text-2xl font-bold mt-2">{{ hospitalizedPatients }}</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-gray-500">Total Médecins</h3>
        <p class="text-2xl font-bold mt-2">{{ totalDoctors }}</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-gray-500">Rendez-vous aujourd'hui</h3>
        <p class="text-2xl font-bold mt-2">{{ todayAppointments }}</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-gray-500">Lits occupés</h3>
        <p class="text-2xl font-bold mt-2">{{ occupiedRooms }}</p>
      </div>
    </div>

    <!-- Rendez-vous par semaine -->
    <div class="grid grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-lg font-semibold mb-6">Rendez-vous par semaine</h3>
        <div class="space-y-4">
          <div v-for="day in Object.keys(appointmentsByWeek)" :key="day" class="flex justify-between items-center">
            <span class="text-gray-600">{{ day }}</span>
            <span class="font-semibold">{{ appointmentsByWeek[day] }}</span>
          </div>
        </div>
      </div>

      <!-- Taux d’occupation -->
      <div class="bg-white p-6 rounded-xl shadow">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Taux d’occupation des chambres</h3>
          <span class="text-2xl font-bold text-emerald-600">{{ occupancyRate }}%</span>
        </div>

        <div class="w-full bg-gray-200 rounded-full h-3">
          <div class="bg-emerald-600 h-3 rounded-full" :style="{ width: occupancyRate + '%' }"></div>
        </div>

        <div class="flex justify-between text-sm text-gray-500 mt-3">
          <span>{{ occupiedRooms }} chambres occupées</span>
          <span>{{ totalRooms }} chambres totales</span>
        </div>
      </div>
    </div>

    <!-- Activités récentes -->
    <!-- À adapter dynamiquement depuis ton historique ou logs -->
  </div>
</template>
