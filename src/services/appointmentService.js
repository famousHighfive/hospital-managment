import Swal from 'sweetalert2'
import { ref } from 'vue'

const API_URL = "http://localhost:3000/api/appointments"

export const appointments = ref([])


// =============================
// Charger les RDV depuis backend
// =============================
export const fetchAppointments = async () => {

    try {

        const res = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        const data = await res.json()

        appointments.value = data

    } catch (error) {

        console.error("Erreur récupération RDV", error)

    }

}



// =============================
// Ajouter RDV
// =============================
export const addAppointment = async (data) => {

    try {

        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(data)

        })
        const newAppointment = await res.json()
         if (!res.ok) {
      throw new Error(newAppointment.message)
    }
        appointments.value.push(newAppointment)

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Rendez-vous ajouté',
            showConfirmButton: false,
            timer: 1500
        })

    } catch (error) {

        console.error("Erreur ajout RDV", error)

    }

}



// =============================
// Supprimer RDV
// =============================
export const deleteAppointment = (id) => {

    const rdv = appointments.value.find(a => a.id === id)

    if (!rdv) return

    Swal.fire({
        title: "Supprimer ce rendez-vous ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Non"
    }).then(async result => {

        if (result.isConfirmed) {

            try {

                await fetch(`${API_URL}/${id}`, {

                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }

                })

                appointments.value =
                    appointments.value.filter(a => a.id !== id)

                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Rendez-vous supprimé',
                    showConfirmButton: false,
                    timer: 1500
                })

            } catch (error) {

                console.error("Erreur suppression RDV", error)

            }

        }

    })
}



// =============================
// Modifier RDV
// =============================
export const updateAppointment = async (updatedData) => {

    try {

        const res = await fetch(`${API_URL}/${updatedData.id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },

            body: JSON.stringify(updatedData)

        })

        const updated = await res.json()

        const index =
            appointments.value.findIndex(a => a.id === updated.id)

        if (index !== -1) {

            appointments.value[index] = updated

        }

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Rendez-vous modifié avec succès',
            showConfirmButton: false,
            timer: 1500
        })

    } catch (error) {

        console.error("Erreur modification RDV", error)

    }

}
