<script setup>
import { ref } from 'vue';

const props = defineProps({
  room: { 
    type : Object,
    required : true
  }
});

console.log(props.room);


const isFull = (room) => {
  return room.currentOccupants === room.capacity;
};

const percentage = (room) => {
  return (room.currentOccupants / room.capacity) * 100;
};
</script>

<template>
  <div class="bg-white border-2 border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition">

    <div class="flex justify-between items-center mb-2">
      <h3 class="text-lg font-semibold">
        Chambre {{ room.number }}
      </h3>

      <span
        :class="[
          'px-3 py-1 text-xs rounded-full font-medium text-white',
          isFull(room) ? 'bg-red-500' : 'bg-green-600'
        ]"
      >
        {{ isFull(room) ? 'Occupée' : 'Disponible' }}
      </span>
    </div>

    <p class="text-gray-600 mb-4">
      Capacité: {{ room.capacity }}
      {{ room.capacity > 1 ? 'lits' : 'lit' }}
    </p>

    <div class="mb-4">
      <div class="flex justify-between text-sm mb-1">
        <span class="text-gray-600">Occupants:</span>
        <span class="font-medium">
          {{ room.currentOccupants }} / {{ room.capacity }}
        </span>
      </div>

      <div class="w-full bg-green-100 h-2 rounded-full">
        <div
          class="bg-green-700 h-2 my-5 rounded-full transition-all"
          :style="{ width: percentage(room) + '%' }"
        ></div>
      </div>
    </div>

<button 
  v-if="!isFull(room)" 
  :room="room"
@click="$router.push({ 
  name: 'assign-patient', 
  query: { roomId: room.id } 
})"
  class="w-full block bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition text-center"
>
  Assigner Patient
</button>

  </div>
</template>
