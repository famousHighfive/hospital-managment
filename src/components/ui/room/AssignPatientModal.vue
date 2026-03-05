<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { patients } from '@/services/patientService'
import { rooms } from '@/services/roomService'
import Swal from 'sweetalert2'
import { currentUser } from '@/services/authService'

const route = useRoute()
const router = useRouter()

// 🔹 Récupérer l'id depuis l'URL
const roomId = Number(route.query.roomId)

// 🔹 Trouver la chambre
const room = computed(() =>
  rooms.value.find(r => r.id === roomId)
)

const selectedPatient = ref('')

// 🔹 Patients sans chambre
const availablePatients = computed(() =>
  patients.value.filter(p => !p.room)
)

const assignPatient = () => {
  const patient = patients.value.find(
    p => p.id === Number(selectedPatient.value)
  )

  if (!patient || !room.value) return

  // 🚫 Si chambre pleine
  if (room.value.currentOccupants >= room.value.capacity) {
    // alert("Chambre déjà complète")
    Swal.fire({
  title: "Chambre déja complète!",
  icon: "error"
});
    return
  }

  // ✅ Assigner numéro chambre
  patient.room = room.value.number

  // ✅ Incrémenter occupation
  room.value.currentOccupants++

  // ✅ Sauvegarder
  localStorage.setItem('patients', JSON.stringify(patients.value))
  localStorage.setItem('rooms', JSON.stringify(rooms.value))
if (currentUser?.role === 'admin') {
  router.push({ name: 'dashbord-admin-room' })
} else if (currentUser?.role === 'receptioniste') {
  router.push({ name: 'dashboard-receptioniste-room' })
}
  router.push({ name: 'dashbord-admin-room' })
}
</script>

<template>
  <div v-if="room" class="p-6">
    <h2 class="text-xl font-bold mb-4">
      Assigner patient à la chambre {{ room.number }}
    </h2>

    <select v-model="selectedPatient" class="w-full p-3 border rounded-lg mb-4">
      <option disabled value="">Choisir un patient</option>
      <option 
        v-for="p in availablePatients" 
        :key="p.id" 
        :value="p.id"
      >
        {{ p.firstName }} {{ p.lastName }}
      </option>
    </select>

    <button
      class="w-full bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
      :disabled="!selectedPatient"
      @click="assignPatient"
    >
      Confirmer
    </button>
  </div>

  <div v-else class="p-6 text-red-500">
    Chambre introuvable
  </div>
</template>
