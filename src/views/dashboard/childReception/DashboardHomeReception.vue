<script setup>
import { computed } from 'vue';
import { patients } from '@/services/patientService';

// Patient total
const totalPatient = computed(() => {
    return patients.value.length
})

// Patients hospitalisés
const totalPatientHospitalise = computed(() => {
  return patients.value.filter(p => p.status === 'Hospitalisé').length
})

// Patients en consultation
const totalPatientConsultation = computed(() => {
  return patients.value.filter(p => p.status === 'En consultation').length
})

// Patients sortis
const totalPatientSorti = computed(() => {
  return patients.value.filter(p => p.status === 'Sorti').length
})

</script>

<template>


    <!-- Title -->
    <div>
        <h2 class="text-2xl font-bold text-gray-800">Dashboard Administrateur</h2>
        <p class="text-gray-500">Vue d'ensemble de l'hôpital</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm">
            <p class="text-gray-500">Total Patients</p>
            <h3 class="text-3xl font-bold mt-2">{{ totalPatient }}</h3>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm">
            <p class="text-gray-500">Patients Hospitalisés</p>
            <h3 class="text-3xl font-bold mt-2">{{ totalPatientHospitalise }}</h3>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm">
            <p class="text-gray-500">Médecins</p>
            <h3 class="text-3xl font-bold mt-2">4</h3>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm">
            <p class="text-gray-500">Rendez-vous Aujourd'hui</p>
            <h3 class="text-3xl font-bold mt-2">3</h3>
        </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-2 gap-6">

        <!-- Fake Chart -->
        <div class="bg-white p-6 rounded-xl shadow-sm">
            <h3 class="font-semibold mb-4">Rendez-vous par semaine</h3>
            <div class="h-64 flex items-center justify-center text-gray-400">
                📈 Graphique ici
            </div>
        </div>

        <!-- Pie -->
        <div class="bg-white p-6 rounded-xl shadow-sm">
            <h3 class="font-semibold mb-4">Occupation des chambres</h3>
            <div class="h-64 flex items-center justify-center text-gray-400">
                🥧 Graphique circulaire ici
            </div>
        </div>

    </div>

    <!-- Activity -->
    <div class="bg-white p-6 rounded-xl shadow-sm">
        <h3 class="font-semibold mb-4">Activité récente</h3>

        <table class="w-full text-left">
            <thead class="border-b">
                <tr class="text-gray-500 text-sm">
                    <th class="py-3">Type</th>
                    <th>Description</th>
                    <th>Utilisateur</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                <tr>
                    <td class="py-4">Ajout</td>
                    <td>Nouveau patient ajouté</td>
                    <td>Admin</td>
                    <td>16/02/2026</td>
                </tr>
                <tr>
                    <td class="py-4">Modification</td>
                    <td>Chambre mise à jour</td>
                    <td>Admin</td>
                    <td>16/02/2026</td>
                </tr>
            </tbody>
        </table>
    </div>


</template>

<style scoped></style>