<script setup>
import { ref } from 'vue'
import { addReceptionist } from '@/services/receptionistService'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const phone = ref('')
const available = ref(true)

// ✅ Champs d'erreur
const errorMessage = ref('')

function handleSubmit() {
  // 🔹 Vérifications
  if (!name.value.trim()) {
    errorMessage.value = 'Le nom est requis.'
    return
  }
  if (!phone.value.trim()) {
    errorMessage.value = 'Le téléphone est requis.'
    return
  }
  // Optionnel : vérifier format téléphone
  const phoneRegex = /^[0-9]{8,15}$/
  if (!phoneRegex.test(phone.value.trim())) {
    errorMessage.value = 'Numéro de téléphone invalide.'
    return
  }

  // 🔹 Si tout est ok, créer le réceptionniste
  addReceptionist({
    name: name.value.trim(),
    phone: phone.value.trim(),
    available: available.value
  })

  // 🔹 Réinitialiser les champs et erreur
  name.value = ''
  phone.value = ''
  available.value = true
  errorMessage.value = ''

  // 🔹 Redirection
  router.push({ name: 'dashboard-admin-receptionist' })
}
</script>

<template>
  <div class="p-6 max-w-md mx-auto bg-white shadow rounded-xl">

    <h2 class="text-xl font-bold mb-6">
      Ajouter Réceptionniste
    </h2>

    <!-- ⚠ Affichage message d'erreur -->
    <div v-if="errorMessage" class="mb-4 text-red-600 font-medium">
      {{ errorMessage }}
    </div>

    <input
      v-model="name"
      placeholder="Nom complet"
      class="border p-3 rounded w-full mb-4"
    />

    <input
      v-model="phone"
      type="number"
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
