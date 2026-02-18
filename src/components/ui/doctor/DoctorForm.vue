<script setup>
import { ref } from 'vue'
import { addDoctor, medicalSpecialities } from '@/services/doctorService'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const speciality = ref('')
const phone = ref('')
const available = ref(true)

function handleSubmit() {
  addDoctor({
    name: name.value,
    speciality: speciality.value,
    phone: phone.value,
    available: available.value
  })

  router.push('/doctor')
}
</script>

<template>
  <div class="p-6 max-w-md mx-auto bg-white shadow rounded-xl">

    <h2 class="text-xl font-bold mb-6">Ajouter Médecin</h2>

    <input
      v-model="name"
      placeholder="Nom complet"
      class="border p-3 rounded w-full mb-4"
    />

    <select
      v-model="speciality"
      class="border p-3 rounded w-full mb-4"
    >
      <option disabled value="">Choisir une spécialité</option>
      <option
        v-for="spec in medicalSpecialities"
        :key="spec"
        :value="spec"
      >
        {{ spec }}
      </option>
    </select>

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
