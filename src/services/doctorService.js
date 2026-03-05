import { ref } from 'vue'
import Swal from 'sweetalert2'

export const medicalSpecialities = [
  "Médecine Générale", "Cardiologie", "Dermatologie", "Neurologie",
  "Pédiatrie", "Gynécologie", "Ophtalmologie", "ORL",
  "Psychiatrie", "Radiologie", "Anesthésiologie", "Chirurgie Générale"
]

const stored = localStorage.getItem('doctors')
export const doctors = ref(stored ? JSON.parse(stored) : [])

function save() {
  localStorage.setItem('doctors', JSON.stringify(doctors.value))
}

export function getDoctors() {
  return doctors
}

export function addDoctor(doctor) {
  doctor.id = Date.now()
  doctor.createdAt = new Date().toISOString()

  doctors.value.push(doctor)
  save()

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Médecin ajouté',
    showConfirmButton: false,
    timer: 1500
  })
}

export function updateDoctor(updatedDoctor) {
  const index = doctors.value.findIndex(d => d.id === updatedDoctor.id)
  if (index === -1) return

  const isModified =
    JSON.stringify(doctors.value[index]) !==
    JSON.stringify(updatedDoctor)

  if (!isModified) return

  doctors.value[index] = updatedDoctor
  save()

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Modification effectuée',
    showConfirmButton: false,
    timer: 1500
  })
}

export function deleteDoctor(id) {
  Swal.fire({
    title: "Supprimer ?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Oui",
    cancelButtonText: "Non"
  }).then((result) => {
    if (result.isConfirmed) {
      doctors.value = doctors.value.filter(d => d.id !== id)
      save()

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Supprimé',
        showConfirmButton: false,
        timer: 1500
      })
    }
  })
}