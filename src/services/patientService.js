import { ref } from 'vue'
import Swal from 'sweetalert2'
import { decrementRoomOccupants, incrementRoomOccupants } from './roomService'

// 🔹 Chargement initial
const storedPatients = localStorage.getItem('patients')

export const patients = ref(
  storedPatients ? JSON.parse(storedPatients) : []
)

const saveToLocalStorage = () => {
  localStorage.setItem("patients", JSON.stringify(patients.value))
}

//
// ✅ AJOUT PATIENT
//
export const addPatient = (newPatient) => {
  const newId =
    patients.value.length > 0
      ? Math.max(...patients.value.map(p => p.id)) + 1
      : 1

  const patient = {
    id: newId,
    ...newPatient,
    createdAt: new Date().toISOString()
  }

  patients.value.push(patient)

  if (patient.status === 'Hospitalisé' && patient.room) {
    incrementRoomOccupants(patient.room)
  }

  saveToLocalStorage()

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Patient ajouté',
    showConfirmButton: false,
    timer: 1500
  })
}

//
// ✅ SUPPRESSION PATIENT
//
export const deletePatient = (id) => {
  const patient = patients.value.find(p => p.id === id)
  if (!patient) return

  Swal.fire({
    title: "Supprimer ce patient ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Oui",
    cancelButtonText: "Non"
  }).then((result) => {
    if (result.isConfirmed) {

      if (patient.status === 'Hospitalisé' && patient.room) {
        decrementRoomOccupants(patient.room)
      }

      patients.value = patients.value.filter(p => p.id !== id)
      saveToLocalStorage()

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Patient supprimé',
        showConfirmButton: false,
        timer: 1500
      })
    }
  })
}

//
// ✅ UPDATE PATIENT (avec vérification modification réelle)
//
export const updatePatient = (updatedPatient) => {
  const index = patients.value.findIndex(p => p.id === updatedPatient.id)
  if (index === -1) return

  const oldPatient = patients.value[index]

  const isModified =
    JSON.stringify(oldPatient) !==
    JSON.stringify({ ...oldPatient, ...updatedPatient })

  if (!isModified) return

  // 🔹 Décrément ancienne chambre si besoin
  if (oldPatient.status === 'Hospitalisé' && oldPatient.room) {
    decrementRoomOccupants(oldPatient.room)
  }

  patients.value[index] = {
    ...oldPatient,
    ...updatedPatient
  }

  const newPatient = patients.value[index]

  // 🔹 Incrément nouvelle chambre si besoin
  if (newPatient.status === 'Hospitalisé' && newPatient.room) {
    incrementRoomOccupants(newPatient.room)
  }

  saveToLocalStorage()

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Modification effectuée',
    showConfirmButton: false,
    timer: 1500
  })
}

//
// ✅ GET PATIENT
//
export const getPatientById = (id) => {
  return patients.value.find(p => p.id === Number(id))
}