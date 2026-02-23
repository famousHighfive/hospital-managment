<script setup>
import { ref, watch, computed } from 'vue'
import { addDoctor, updateDoctor, medicalSpecialities } from '@/services/doctorService'

const props = defineProps({
  doctor: Object, // doctor à modifier ou null
})

const emit = defineEmits(['close'])

const name = ref('')
const speciality = ref('')
const phone = ref('')
const available = ref(true)

// Pré-remplir si doctor est passé
watch(
  () => props.doctor,
  (newDoctor) => {
    if (newDoctor) {
      name.value = newDoctor.name || ''
      speciality.value = newDoctor.speciality || ''
      phone.value = newDoctor.phone || ''
      available.value = newDoctor.available ?? true
    } else {
      name.value = ''
      speciality.value = ''
      phone.value = ''
      available.value = true
    }
  },
  { immediate: true }
)

const isEdit = computed(() => !!props.doctor)

function handleSubmit() {
  const doctorData = {
    id: isEdit.value ? props.doctor.id : undefined,
    name: name.value,
    speciality: speciality.value,
    phone: phone.value,
    available: available.value
  }

  if (isEdit.value) {
    updateDoctor(doctorData)
  } else {
    addDoctor(doctorData)
  }

  emit('close')
}
</script>

<template>
  <div class="p-6 bg-white rounded-xl shadow-lg w-full max-w-md">
    <h2 class="text-xl font-bold mb-6 text-gray-800">
      {{ isEdit ? 'Modifier Médecin' : 'Ajouter Médecin' }}
    </h2>

    <div class="mb-4">
      <label class="block text-sm text-gray-600 mb-1">Nom complet</label>
      <input v-model="name" placeholder="Nom complet"
        class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-600 mb-1">Spécialité</label>
      <select v-model="speciality" class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
        <option disabled value="">Choisir une spécialité</option>
        <option v-for="spec in medicalSpecialities" :key="spec" :value="spec">
          {{ spec }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-600 mb-1">Téléphone</label>
      <input v-model="phone" placeholder="Téléphone"
        class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
    </div>

    <div class="mb-6">
      <label class="block text-sm text-gray-600 mb-1">Disponibilité</label>
      <select v-model="available" class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
        <option :value="true">Disponible</option>
        <option :value="false">Indisponible</option>
      </select>
    </div>

    <div class="flex gap-2">
      <button @click="handleSubmit" class="flex-1 py-2 rounded-lg text-white font-medium"
        :class="isEdit ? 'bg-green-300 hover:bg-green-500' : 'bg-green-600 hover:bg-green-700'">
        {{ isEdit ? 'Mettre à jour' : 'Enregistrer' }}
      </button>

      <button @click="emit('close')" class="flex-1 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-medium">
        Annuler
      </button>
    </div>
  </div>
</template>
