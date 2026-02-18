<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addRoom } from '@/services/roomService'

const router = useRouter()

const number = ref('')
const capacity = ref(1)
const message = ref('')
const error = ref(false)

function submitForm() {

  if (!number.value || capacity.value < 1) {
    message.value = "Veuillez remplir correctement les champs"
    error.value = true
    return
  }

  const result = addRoom({
    number: number.value,
    capacity: capacity.value
  })

  if (!result.success) {
    message.value = result.message
    error.value = true
    return
  }

  router.push({ name: 'dashbord-admin-room' })
}
</script>

<template>
  <div class="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">

    <h2 class="text-xl font-semibold mb-6">Ajouter une chambre</h2>

    <div v-if="message" 
         :class="error ? 'text-red-500' : 'text-green-600'"
         class="mb-4">
      {{ message }}
    </div>

    <div class="space-y-4">

      <div>
        <label class="block text-sm mb-1">Numéro de chambre</label>
        <input
          v-model="number"
          type="text"
          class="w-full border rounded-lg px-3 py-2"
          placeholder="Ex: 201"
        />
      </div>

      <div>
        <label class="block text-sm mb-1">Capacité</label>
        <input
          v-model="capacity"
          type="number"
          min="1"
          class="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <button
        @click="submitForm"
        class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition"
      >
        Ajouter
      </button>

    </div>
  </div>
</template>
