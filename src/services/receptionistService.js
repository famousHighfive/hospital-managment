import { ref } from 'vue'
import Swal from 'sweetalert2'

const storedReceptionist = localStorage.getItem('receptionists')

export const receptionists = ref(
  storedReceptionist ? JSON.parse(storedReceptionist) : []
)

function save() {
  localStorage.setItem('receptionists', JSON.stringify(receptionists.value))
}

export function getReceptionists() {
  return receptionists
}

//
// ✅ AJOUT
//
export function addReceptionist(receptionist) {
  const newReceptionist = {
    id: Date.now(),
    userId: null,
    createdAt: new Date().toISOString(),
    ...receptionist
  }

  receptionists.value.push(newReceptionist)
  save()

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Réceptionniste ajouté',
    showConfirmButton: false,
    timer: 1500
  })
}

//
// ✅ UPDATE (seulement si modification réelle)
//
export function updateReceptionist(updatedReceptionist) {
  const index = receptionists.value.findIndex(
    r => r.id === updatedReceptionist.id
  )

  if (index === -1) return

  const oldReceptionist = receptionists.value[index]

  const isModified =
    JSON.stringify(oldReceptionist) !==
    JSON.stringify(updatedReceptionist)

  if (!isModified) return

  receptionists.value[index] = updatedReceptionist
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

//
// ✅ DELETE avec confirmation
//
export function deleteReceptionist(id) {
  const receptionist = receptionists.value.find(r => r.id === id)
  if (!receptionist) return

  Swal.fire({
    title: "Supprimer cette réceptionniste ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Oui",
    cancelButtonText: "Non"
  }).then(result => {
    if (result.isConfirmed) {
      receptionists.value = receptionists.value.filter(r => r.id !== id)
      save()

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Supprimé avec succès',
        showConfirmButton: false,
        timer: 1500
      })
    }
  })
}