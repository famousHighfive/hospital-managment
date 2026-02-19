<script setup>
import { ref, computed } from 'vue'
import { getPatientById, updatePatient } from '@/services/patientService'
import { useRoute, useRouter } from 'vue-router'
import { currentUser } from '@/services/authService'

const role = computed(() => currentUser.value?.role)
const route = useRoute()
const router = useRouter()

const patient = getPatientById(route.params.id)

const newNote = ref('')

const formattedDate = computed(() => {
    if (!patient?.createdAt) return '-'
    return new Date(patient.createdAt).toLocaleDateString('fr-FR')
})

const statusClass = computed(() => {
    if (!patient) return ''
    return {
        'bg-green-100 text-green-700': patient.status === 'Hospitalisé',
        'bg-orange-100 text-orange-700': patient.status === 'En consultation',
        'bg-gray-200 text-gray-600': patient.status === 'Sorti'
    }
})

// Simulation rendez-vous (plus tard tu pourras connecter au vrai service)
const appointments = ref([
    {
        doctor: patient?.doctor,
        date: '16/02/2026',
        time: '14:00',
        status: 'En attente'
    }
])

const addNote = () => {
    if (!newNote.value.trim()) return

    if (!patient.notes) {
        patient.notes = []
    }

    patient.notes.push({
        content: newNote.value,
        date: new Date().toLocaleDateString('fr-FR')
    })

    updatePatient(patient)
    newNote.value = ''
}
</script>

<template>
    <div v-if="patient" class="p-8 bg-gray-50 min-h-screen">

        <!-- Header -->
        <div class="flex items-center gap-4 mb-6">
            <button @click="router.back()" class="text-gray-600 hover:text-black">
                ← Retour
            </button>
        </div>

        <!-- Card Infos Patient -->
        <div class="bg-white rounded-2xl shadow p-8 mb-8">

            <div class="flex justify-between items-start mb-6">
                <div>
                    <h1 class="text-3xl font-bold">
                        {{ patient.firstName }} {{ patient.lastName }}
                    </h1>
                    <p class="text-gray-500 mt-1">Détails du patient</p>
                </div>

                <span class="px-4 py-1 rounded-full text-sm font-medium" :class="statusClass">
                    {{ patient.status }}
                </span>
            </div>

            <!-- Grid infos -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <p class="text-gray-500 text-sm">Genre</p>
                    <p class="font-semibold">
                        {{ patient.gender === 'H' ? 'Homme' : 'Femme' }}
                    </p>
                </div>

                <div>
                    <p class="text-gray-500 text-sm">Téléphone</p>
                    <p class="font-semibold">{{ patient.phone }}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-sm">Groupe sanguin</p>
                    <p class="font-semibold">{{ patient.bloodGroup }}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-sm">Médecin assigné</p>
                    <p class="font-semibold">{{ patient.doctor }}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-sm">Chambre</p>
                    <p class="font-semibold">
                        {{ patient.room ? 'Chambre ' + patient.room : 'Aucune' }}
                    </p>
                </div>

                <div>
                    <p class="text-gray-500 text-sm">Date d'enregistrement</p>
                    <p class="font-semibold">{{ formattedDate }}</p>
                </div>

            </div>
        </div>

        <!-- Historique des rendez-vous -->
        <div class="bg-white rounded-2xl shadow p-8 mb-8">
            <h2 class="text-xl font-semibold mb-6">Historique des rendez-vous</h2>

            <table class="w-full text-left">
                <thead class="border-b">
                    <tr>
                        <th class="pb-3">Médecin</th>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(a, index) in appointments" :key="index" class="border-b last:border-none">
                        <td class="py-4">{{ a.doctor }}</td>
                        <td>{{ a.date }}</td>
                        <td>{{ a.time }}</td>
                        <td>
                            <span class="px-3 py-1 rounded-lg text-sm border border-orange-400 text-orange-600">
                                {{ a.status }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Notes médicales -->
        <div v-if="role === 'doctor'" class="bg-white rounded-2xl shadow p-8">
            <h2 class="text-xl font-semibold mb-6">Notes médicales</h2>

            <div class="mb-4">
                <label class="block mb-2 font-medium">Ajouter une note</label>
                <textarea v-model="newNote" placeholder="Entrer une note médicale..."
                    class="w-full p-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <button @click="addNote" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                + Ajouter Note
            </button>

            <!-- Liste des notes -->
            <div v-if="patient.notes?.length" class="mt-8 space-y-4">
                <div v-for="(note, index) in patient.notes" :key="index" class="p-4 bg-gray-50 rounded-lg border">
                    <p class="text-sm text-gray-500 mb-2">{{ note.date }}</p>
                    <p>{{ note.content }}</p>
                </div>
            </div>

            <p v-else class="text-center text-gray-500 mt-8">
                Aucune note médicale
            </p>

        </div>

    </div>
</template>
