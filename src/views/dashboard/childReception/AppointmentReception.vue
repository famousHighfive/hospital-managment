<script setup>
import BaseModal from '@/components/ui/BaseModal.vue'
import PatientFormModal from '@/components/ui/patient/PatientFormModal.vue'
import { ref, computed } from 'vue'


const search = ref('')
// const statusFilter = ref('')
const showAddModal = ref(false)

const patients = ref([
    { id: 1, name: 'Jean Dupont', gender: 'H', phone: '06 12 34 56 78', blood: 'A+', doctor: 'Dr. Laurent Blanc', room: '101', status: 'Hospitalisé' },
    { id: 2, name: 'Marie Martin', gender: 'F', phone: '06 23 45 67 89', blood: 'O+', doctor: 'Dr. Sophie Petit', room: '102', status: 'Hospitalisé' },
    { id: 3, name: 'Pierre Bernard', gender: 'H', phone: '06 34 56 78 90', blood: 'B+', doctor: 'Dr. Laurent Blanc', room: '56', status: 'En consultation' },
    { id: 4, name: 'Sophie Dubois', gender: 'F', phone: '06 45 67 89 01', blood: 'AB+', doctor: 'Dr. Marc Lefebvre', room: '309', status: 'Sorti' },
])

const filteredPatients = computed(() => {
    return patients.value.filter(p =>
        p.name.toLowerCase().includes(search.value.toLowerCase())
    )
})
</script>

<template>
    <div class="p-8 bg-gray-50 min-h-screen">

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
                        <td class="p-4">{{ p.name }}</td>
                        <td>{{ p.gender }}</td>
                        <td>{{ p.phone }}</td>
                        <td>{{ p.bloodGroup }}</td>
                        <td>{{ p.doctor }}</td>
                        <td>{{ p.room }}</td>
                        <td>
                            <span class="px-3 py-2 text-sm rounded-full" :class="{
                                'bg-green-100 text-green-700': p.status === 'Hospitalisé',
                                'bg-orange-100 text-orange-700': p.status === 'En consultation',
                                'bg-gray-200 text-gray-600': p.status === 'Sorti'
                            }">
                                {{ p.status }}
                            </span>
                        </td>
                        <td class="space-x-2">
                            <button class="cursor-pointer">👁</button>
                            <button class="cursor-pointer">✏️</button>
                            <button class="cursor-pointer">🗑</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal Ajouter -->
        <BaseModal v-model="showAddModal">
            <PatientFormModal />
        </BaseModal>

    </div>
</template>
