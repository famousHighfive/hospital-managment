<script setup>
import { ref } from 'vue'
import { addReceptionist } from '@/services/receptionistService'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const phone = ref('')
const available = ref(true)

function handleSubmit() {
  addReceptionist({
    name: name.value,
    phone: phone.value,
    available: available.value
  })

  router.push({ name: 'dashboard-admin-receptionist' })
}
</script>
<template>
  <div class="p-6 max-w-md mx-auto bg-white shadow rounded-xl">

    <h2 class="text-xl font-bold mb-6">
      Ajouter Réceptionniste
    </h2>

    <input
      v-model="name"
      placeholder="Nom complet"
      class="border p-3 rounded w-full mb-4"
    />

    <input
      v-model="phone"
      placeholder="Téléphone"
      class="border p-3 rounded w-full mb-4"
    />

    <select v-model="available" class="border p-3 rounded w-full mb-4">
      <option :value="true">Disponible</option>
      <option :value="false">Indisponible</option>
    </select>

    <button
      @click="handleSubmit"
      class="bg-blue-600 text-white w-full py-2 rounded-lg"
    >
      Enregistrer
    </button>

  </div>
</template>
