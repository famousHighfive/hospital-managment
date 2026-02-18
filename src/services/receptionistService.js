import { ref } from 'vue'

export const receptionists = ref(
  JSON.parse(localStorage.getItem('receptionists')) || []
)
export function addReceptionist(receptionist) {
  receptionist.id = Date.now()
  receptionist.userId = null // 🔥 liaison utilisateur
  receptionist.createdAt = new Date().toISOString()
  receptionists.value.push(receptionist)
  save()
}

function save() {
  localStorage.setItem('receptionists', JSON.stringify(receptionists.value))
}

export function getReceptionists() {
  return receptionists
}

// export function addReceptionist(receptionist) {
//   receptionist.id = Date.now()
//   receptionist.createdAt = new Date().toISOString()
//   receptionists.value.push(receptionist)
//   save()
// }

export function updateReceptionist(updatedReceptionist) {
  const index = receptionists.value.findIndex(r => r.id === updatedReceptionist.id)
  if (index !== -1) {
    receptionists.value[index] = updatedReceptionist
    save()
  }
}

export function deleteReceptionist(id) {
  receptionists.value = receptionists.value.filter(r => r.id !== id)
  save()
}
