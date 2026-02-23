<script setup>
import { ref, watch, computed } from 'vue'
import { addReceptionist, updateReceptionist } from '@/services/receptionistService'

const props = defineProps({
  receptionist: Object, // null pour création, objet pour modification
})

const emit = defineEmits(['close'])

const name = ref('')
const phone = ref('')
const available = ref(true)

// Pré-remplir si on modifie
watch(
  () => props.receptionist,
  (newRec) => {
    if (newRec) {
      name.value = newRec.name || ''
      phone.value = newRec.phone || ''
      available.value = newRec.available ?? true
    } else {
      name.value = ''
      phone.value = ''
      available.value = true
    }
  },
  { immediate: true }
)

const isEdit = computed(() => !!props.receptionist)

function handleSubmit() {
  const data = {
    id: isEdit.value ? props.receptionist.id : undefined,
    name: name.value,
    phone: phone.value,
    available: available.value
  }

  if (isEdit.value) {
    updateReceptionist(data)
  } else {
    addReceptionist(data)
  }

  emit('close')
}
</script>

<template>
  <div class="p-6 bg-white rounded-xl shadow-lg w-full max-w-md">
    <h2 class="text-xl font-bold mb-6 text-gray-800">
      {{ isEdit ? 'Modifier Réceptionniste' : 'Ajouter Réceptionniste' }}
    </h2>

    <div class="mb-4">
      <label class="block text-sm text-gray-600 mb-1">Nom complet</label>
      <input
        v-model="name"
        placeholder="Nom complet"
        class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
      />
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-600 mb-1">Téléphone</label>
      <input
        v-model="phone"
        type="number"
        placeholder="Téléphone"
        class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
      />
    </div>

    <div class="mb-6">
      <label class="block text-sm text-gray-600 mb-1">Disponibilité</label>
      <select
        v-model="available"
        class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
      >
        <option :value="true">Disponible</option>
        <option :value="false">Indisponible</option>
      </select>
    </div>

    <div class="flex gap-2">
      <button
        @click="handleSubmit"
        class="flex-1 py-2 rounded-lg text-white font-medium bg-green-600 hover:bg-green-700"
      >
        {{ isEdit ? 'Mettre à jour' : 'Enregistrer' }}
      </button>

      <button
        @click="emit('close')"
        class="flex-1 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-medium"
      >
        Annuler
      </button>
    </div>
  </div>
</template>
