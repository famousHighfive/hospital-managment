import Swal from 'sweetalert2'
import { ref } from 'vue'

const storedAppointment = localStorage.getItem('rdv')


export const appointments = ref(
    storedAppointment ? JSON.parse(storedAppointment) : [])

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
    const rdv = appointments.value.find(a => a.id === id)
    if (!rdv) return

    Swal.fire({
        title: "Supprimer ce rendez-vous ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Non"
    }).then(result => {
        if (result.isConfirmed) {
            appointments.value = appointments.value.filter(a => a.id !== id)
            saveToLocalStorage()

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Rendez-vous supprimé',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
}
// ✅ Fonction pour modifier un RDV
export const updateAppointment = (updatedData) => {

    const index = appointments.value.findIndex(a => a.id === updatedData.id)
    if (index === -1) return

    appointments.value[index] = {
        ...appointments.value[index],
        ...updatedData
    }

    saveToLocalStorage()

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Rendez-vous modifié avec succès',
        showConfirmButton: false,
        timer: 1500
    })
}


