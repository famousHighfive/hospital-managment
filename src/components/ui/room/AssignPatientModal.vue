<script setup>
import { ref } from 'vue'

const props = defineProps({
    room: Object
})

const patients = ref([
    'Jean Dupont',
    'Marie Martin',
    'Pierre Bernard'
])

const selectedPatient = ref('')
</script>

<template>
    <div>
        <h2 class="text-xl font-bold mb-4">
            Assigner patient à la chambre {{ room?.id }}
        </h2>

        <select v-model="selectedPatient" class="w-full p-3 border rounded-lg mb-4">
            <option disabled value="">Choisir un patient</option>
            <option v-for="p in patients" :key="p">{{ p }}</option>
        </select>

        <button class="w-full bg-green-600 text-white py-2 rounded-lg">
            Confirmer
        </button>
    </div>
</template>
