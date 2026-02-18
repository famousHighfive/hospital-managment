import { onMounted, ref } from 'vue'

// Tableau réactif pour stocker tous les RDV
export const appointments = ref([
    { id: 1, patientId: 1, doctorId: 1, date: '2023-10-25', time: '10:00', status: 'Confirmé' },
    { id: 2, patientId: 2, doctorId: 3, date: '2023-10-26', time: '14:30', status: 'En attente' }
])

// Enregistrement et recuperation dans le local storage
localStorage.setItem('rdv', JSON.stringify(appointments.value))
onMounted(() => {
    appointments.value = localStorage.getItem('rdv') ? JSON.parse(localStorage.getItem('rdv')) : appointments.value
})

// Fonction pour ajouter un RDV
export const addAppointment = (data) => {
    const newAppointment = {
        id: Date.now(), // ID unique
        ...data
    }
    appointments.value.push(newAppointment)
}

// Fonction pour supprimer
export const deleteAppointment = (id) => {
    appointments.value = appointments.value.filter(app => app.id !== id)
}
