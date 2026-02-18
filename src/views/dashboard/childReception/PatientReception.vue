<script setup>
import { ref, computed, handleError } from 'vue'
import { deletePatient, patients } from '@/services/patientService'
import BaseModal from '@/components/ui/BaseModal.vue'

const search = ref('')
const showAddModal = ref(false)

const filteredPatients = computed(() => {
    return patients.value.filter(p =>
        p.firstName.toLowerCase().includes(search.value.toLowerCase()) || p.lastName.toLowerCase().includes(search.value.toLowerCase())
    )
})

const handleDelete = (id) => {
    deletePatient(id)
}
</script>

<template>
    <div v-if="$route.params.id">
        <RouterView />
    </div>
    <div v-else class="p-8 bg-gray-50 min-h-screen">

        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-3xl font-bold">Gestion des Patients</h1>
                <p class="text-gray-500">Gérer tous les patients de l'hôpital</p>
            </div>

            <button @click="showAddModal = true"
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                + Ajouter Patient
            </button>
        </div>

        <!-- Search -->
        <div class="mb-4">
            <!-- <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    data-fg-do8g97="2.51:2.13127:/src/app/pages/PatientsPage.tsx:240:13:9812:105:e:Search::::::B9rK">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </svg>
            </span> -->
            <input v-model="search" type="text" placeholder="Rechercher un patient..."
                class="w-full p-3 border rounded-lg" />
        </div>

        <!-- Table -->
        <div class="bg-white rounded-xl shadow overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="p-4">Nom</th>
                        <th>Prenom</th>
                        <th>Genre</th>
                        <th>Téléphone</th>
                        <th>Groupe</th>
                        <th>Médecin</th>
                        <th>Chambre</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="p in filteredPatients" :key="p.id" class="border-t">
                        <td class="p-4">{{ p.lastName }}</td>
                        <td>{{ p.firstName }}</td>
                        <td>{{ p.gender }}</td>
                        <td>{{ p.phone }}</td>
                        <td>{{ p.bloodGroup }}</td>
                        <td>{{ p.doctor }}</td>
                        <td>{{ p.room }}</td>
                        <td>
                            <span class="px-3 py-1 text-sm rounded-full" :class="{
                                'bg-green-100 text-green-700': p.status === 'Hospitalisé',
                                'bg-orange-100 text-orange-700': p.status === 'En consultation',
                                'bg-gray-200 text-gray-600': p.status === 'Sorti'
                            }">
                                {{ p.status }}
                            </span>
                        </td>
                        <td class="space-x-2">
                            <button @click="$router.push({ name: 'patient-info-detail', params: { id: p.id } })"
                                class="cursor-pointer">👁</button>
                            <button class="cursor-pointer">✏️</button>
                            <button @click="handleDelete(p.id)" class="cursor-pointer">🗑</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal Ajouter -->
        <BaseModal v-model="showAddModal">
            <PatientFormModal @close="showAddModal = false" />
        </BaseModal>

    </div>

</template>
