import { ref } from 'vue'
import Swal from 'sweetalert2'

export const medicalSpecialities = [
  "Médecine Générale", "Cardiologie", "Dermatologie", "Neurologie",
  "Pédiatrie", "Gynécologie", "Ophtalmologie", "ORL",
  "Psychiatrie", "Radiologie", "Anesthésiologie", "Chirurgie Générale"
]


const API_URL = 'http://localhost:3000/api/doctors' // ton backend
export const doctors = ref([])

// 🔹 Récupérer les médecins depuis le backend
export async function getDoctors() {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Impossible de récupérer les médecins')
    doctors.value = await res.json()
  } catch (error) {
    console.error(error)
    Swal.fire('Erreur', error.message, 'error')
  }
  return doctors
}

// 🔹 Ajouter un médecin (backend + mise à jour locale)
export async function addDoctor(doctor) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctor)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Impossible d’ajouter')
    doctors.value.push(data)

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Médecin ajouté',
      showConfirmButton: false,
      timer: 1500
    })
  } catch (error) {
    Swal.fire('Erreur', error.message, 'error')
  }
}

// 🔹 Modifier un médecin
export async function updateDoctor(updatedDoctor) {
  try {
    const res = await fetch(`${API_URL}/${updatedDoctor.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDoctor)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Impossible de modifier')

    const index = doctors.value.findIndex(d => d.id === updatedDoctor.id)
    if (index !== -1) doctors.value[index] = data

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Modification effectuée',
      showConfirmButton: false,
      timer: 1500
    })
  } catch (error) {
    Swal.fire('Erreur', error.message, 'error')
  }
}

// 🔹 Supprimer un médecin
export async function deleteDoctor(id) {
  try {
    const result = await Swal.fire({
      title: "Supprimer ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non"
    })

    if (!result.isConfirmed) return

    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Impossible de supprimer')

    doctors.value = doctors.value.filter(d => d.id !== id)

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Supprimé',
      showConfirmButton: false,
      timer: 1500
    })
  } catch (error) {
    Swal.fire('Erreur', error.message, 'error')
  }
}
