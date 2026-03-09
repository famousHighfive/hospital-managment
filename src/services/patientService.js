import { ref } from 'vue'
import Swal from 'sweetalert2'

export const patients = ref([])

const API_URL = "http://localhost:3000/api/patients"

const getToken = () => {
  return localStorage.getItem("token")
}

//
// 🔹 CHARGER LES PATIENTS DEPUIS LE BACKEND
//
export const loadPatients = async () => {
  try {

    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    const data = await res.json()
    patients.value = data

  } catch (error) {
    console.error("Erreur chargement patients", error)
  }
}

//
// ✅ AJOUT PATIENT
//
export const addPatient = async (newPatient) => {

  try {

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(newPatient)
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message)
    }

    patients.value.push(data)

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Patient ajouté',
      showConfirmButton: false,
      timer: 1500
    })

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: error.message
    })

  }
}

//
// ✅ SUPPRESSION PATIENT
//
export const deletePatient = async (id) => {

  const result = await Swal.fire({
    title: "Supprimer ce patient ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Oui",
    cancelButtonText: "Non"
  })

  if (!result.isConfirmed) return

  try {

    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.message)

    patients.value = patients.value.filter(p => p.id !== id)

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Patient supprimé',
      showConfirmButton: false,
      timer: 1500
    })

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: error.message
    })

  }
}

//
// ✅ UPDATE PATIENT
//
export const updatePatient = async (updatedPatient) => {

  try {

    const res = await fetch(`${API_URL}/${updatedPatient.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(updatedPatient)
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.message)

    const index = patients.value.findIndex(p => p.id === updatedPatient.id)

    if (index !== -1) {
      patients.value[index] = data
    }

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Modification effectuée',
      showConfirmButton: false,
      timer: 1500
    })

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: error.message
    })

  }
}

//
// ✅ GET PATIENT
//
export const getPatientById = async (id) => {

  try {

    const res = await fetch(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    const data = await res.json()

    return data

  } catch (error) {
    console.error(error)
  }
}
