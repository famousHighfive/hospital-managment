import { ref } from 'vue'

export const selectedRoom = ref(null)
export const rooms = ref([]) // tableau synchronisé avec le backend
const API_URL = 'http://localhost:3000/api/rooms' // URL de ton backend

// 🔹 Récupérer toutes les chambres depuis le backend
export async function getRooms() {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Impossible de récupérer les chambres')
    rooms.value = await res.json()
  } catch (error) {
    console.error(error)
    rooms.value = [] // si backend indisponible
  }
  return rooms
}

// 🔹 Ajouter une chambre via backend
export async function addRoom(newRoom) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: Number(newRoom.number),
        capacity: Number(newRoom.capacity)
      })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Impossible d’ajouter la chambre')

    rooms.value.push(data)
    return { success: true, message: 'Chambre ajoutée avec succès' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// 🔹 Supprimer une chambre via backend
export async function deleteRoom(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Impossible de supprimer la chambre')

    rooms.value = rooms.value.filter(r => r.id !== id)
  } catch (error) {
    console.error(error)
  }
}

// 🔹 Incrémenter occupants localement
export function incrementRoomOccupants(roomNumber) {
  const room = rooms.value.find(r => r.number === Number(roomNumber))
  if (room) room.currentOccupants++
}

// 🔹 Décrémenter occupants localement
export function decrementRoomOccupants(roomNumber) {
  const room = rooms.value.find(r => r.number === Number(roomNumber))
  if (room && room.currentOccupants > 0) room.currentOccupants--
}

export default { getRooms }
