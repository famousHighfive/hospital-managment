import { ref } from 'vue'

const storedAppointment = localStorage.getItem('rdv')
// Tableau réactif pour stocker tous les RDV
export const appointments = ref(
    storedAppointment ? JSON.parse(storedAppointment) : [
        { id: 1, patientId: 1, doctorId: 1, date: '2023-10-25', time: '10:00', status: 'Confirmé' },
        { id: 2, patientId: 2, doctorId: 3, date: '2023-10-26', time: '14:30', status: 'En attente' }
    ])

// Enregistrement et recuperation dans le local storage
const saveToLocalStorage = () => {
    localStorage.setItem('rdv', JSON.stringify(appointments.value))
}


// Fonction pour ajouter un RDV
export const addAppointment = (data) => {

    const newId =
        appointments.value.length > 0
            ? Math.max(...appointments.value.map((p) => p.id)) + 1
            : 1

    const newAppointment = {
        id: newId, // ID unique
        ...data
    }
    appointments.value.push(newAppointment)

    saveToLocalStorage()
}

// Fonction pour supprimer
export const deleteAppointment = (id) => {
    appointments.value = appointments.value.filter(app => app.id !== id)

    saveToLocalStorage()
}

