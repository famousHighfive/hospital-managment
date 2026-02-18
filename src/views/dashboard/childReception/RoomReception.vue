<script setup>
import BaseModal from '@/components/ui/BaseModal.vue'
import AssignPatientModal from '@/components/ui/room/AssignPatientModal.vue'
import { ref } from 'vue'


const showAssignModal = ref(false)
const selectedRoom = ref(null)

const rooms = ref([
    { id: 101, capacity: 2, occupied: 1 },
    { id: 102, capacity: 2, occupied: 1 },
    { id: 103, capacity: 1, occupied: 1 },
    { id: 104, capacity: 2, occupied: 0 },
])

const openAssign = (room) => {
    selectedRoom.value = room
    showAssignModal.value = true
}
</script>

<template>
    <div class="p-8 bg-gray-50 min-h-screen">

        <h1 class="text-3xl font-bold mb-6">Gestion des Chambres</h1>

        <div class="grid grid-cols-3 gap-6">
            <div v-for="room in rooms" :key="room.id" class="bg-white rounded-xl shadow p-6">

                <div class="flex justify-between items-center mb-2">
                    <h2 class="text-xl font-bold">Chambre {{ room.id }}</h2>
                    <span class="px-3 py-1 rounded-full text-sm" :class="room.occupied === room.capacity
                        ? 'bg-red-100 text-red-600'
                        : 'bg-green-100 text-green-600'">
                        {{ room.occupied === room.capacity ? 'Occupée' : 'Disponible' }}
                    </span>
                </div>

                <p class="text-gray-500 mb-2">Capacité: {{ room.capacity }} lits</p>

                <p>Occupants: {{ room.occupied }} / {{ room.capacity }}</p>

                <div class="w-full bg-gray-200 h-2 rounded mt-2">
                    <div class="bg-green-600 h-2 rounded"
                        :style="{ width: (room.occupied / room.capacity * 100) + '%' }">
                    </div>
                </div>

                <button v-if="room.occupied < room.capacity" @click="openAssign(room)"
                    class="mt-4 w-full bg-green-600 text-white py-2 rounded-lg">
                    Assigner Patient
                </button>
            </div>
        </div>

        <!-- Modal assignation -->
        <BaseModal v-model="showAssignModal">
            <AssignPatientModal :room="selectedRoom" />
        </BaseModal>

    </div>
</template>


</script>


<template>

<h1>Room made by Florence</h1>

</template>


<style scoped>


</style>
