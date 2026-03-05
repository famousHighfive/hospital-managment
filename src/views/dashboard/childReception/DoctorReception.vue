<script setup>
import { ref, computed } from 'vue'
import { doctors } from '@/services/doctorService'

const search = ref('')
const statusFilter = ref('all')

const filteredDoctors = computed(() => {
    return doctors.value.filter(doc => {
        const matchesName = doc.name.toLowerCase().includes(search.value.toLowerCase()) || 
                            doc.speciality.toLowerCase().includes(search.value.toLowerCase())
        
        const matchesStatus = statusFilter.value === 'all' || 
                             (statusFilter.value === 'available' ? doc.available : !doc.available)
        
        return matchesName && matchesStatus
    })
})
</script>

<template>
    <div class="p-8 bg-gray-50 min-h-screen">
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-3xl font-bold text-gray-800">Annuaire Médical</h1>
                <p class="text-gray-500">Consulter les disponibilités des médecins</p>
            </div>
            <div class="flex gap-2">
                <select v-model="statusFilter" class="p-3 border rounded-lg bg-white outline-none">
                    <option value="all">Tous les statuts</option>
                    <option value="available">Disponible</option>
                    <option value="unavailable">Absent / Occupé</option>
                </select>
            </div>
        </div>

        <div class="mb-4">
            <input v-vee-model="search" v-model="search" type="text" 
                placeholder="Rechercher par nom ou spécialité..."
                class="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>

        <!-- Table -->
        <div class="bg-white rounded-xl shadow overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
                    <tr>
                        <th class="p-4">Médecin</th>
                        <th>Spécialité</th>
                        <th>Téléphone</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="doc in filteredDoctors" :key="doc.id" class="border-t hover:bg-gray-50 transition">
                        <td class="p-4 font-medium text-gray-900">{{ doc.name }}</td>
                        <td class="text-blue-600">{{ doc.speciality }}</td>
                        <td class="font-mono text-sm">{{ doc.phone }}</td>
                        <td>
                            <span :class="[
                                'px-3 py-1 text-xs font-bold rounded-full',
                                doc.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            ]">
                                {{ doc.available ? 'DISPONIBLE' : 'INDISPONIBLE' }}
                            </span>
                        </td>
                        <td class="p-4">
                            <button class="text-blue-500 hover:text-blue-700 p-1 mr-2" title="Voir planning">📅</button>
                            <button class="text-gray-500 hover:text-gray-700 p-1" title="Contacter">📞</button>
                        </td>
                    </tr>
                    <tr v-if="filteredDoctors.length === 0">
                        <td colspan="5" class="p-8 text-center text-gray-400 italic">
                            Aucun médecin trouvé pour cette recherche.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
