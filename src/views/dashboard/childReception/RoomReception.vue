<script setup>
import { rooms } from "@/services/roomService";
import RoomCard from "@/components/RoomCard.vue";
</script>


<template>

    
  <div class="p-6 bg-gray-50 min-h-screen">

    <h2 class="text-2xl font-bold mb-1">
      Gestion des Chambres
    </h2>
    <p class="text-gray-500 mb-6">
      Gérer l'occupation des chambres
    </p>
     <div class="flex justify-between items-center mb-6">


  <RouterLink
    :to="{ name: 'dashboard-admin-room-create' }"
    class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition  ml-auto"
  >
    + Ajouter Chambre
  </RouterLink>
</div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <RoomCard
       v-for="room in rooms"
        :key="room.id"
        :room="room"
      />
    </div>


  </div>
</template>
