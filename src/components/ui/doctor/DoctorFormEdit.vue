<script setup>


</script>


<template>

<!-- Statut -->
<div>
    <label class="block text-sm font-medium mb-1">Statut du rendez-vous</label>
    <select v-model="status"
        class="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#108565] focus:outline-none transition-all"
        :class="{'border-orange-300': status === 'En attente', 'border-green-300': status === 'Confirmé'}">
        
        <option value="En attente">⏳ En attente</option>
        
        <!-- L'option devient cliquable si l'utilisateur a les droits -->
        <option :disabled="!canConfirm" value="Confirmé">
            ✅ Confirmé
        </option>
    </select>
    <p class="text-[10px] text-gray-500 mt-1">
        * Seul un membre du personnel peut confirmer un rendez-vous.
    </p>
</div>


</template>


<style scoped>


</style>