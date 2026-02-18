
import { ref } from 'vue'
export const selectedRoom = ref(null)
 const defaultRooms = [
  { id: 1, number: 101, capacity: 2, currentOccupants: 1 },
  { id: 2, number: 102, capacity: 2, currentOccupants: 1 },
  { id: 3, number: 103, capacity: 1, currentOccupants: 1 },
  { id: 4, number: 104, capacity: 2, currentOccupants: 0 },
  { id: 5, number: 105, capacity: 1, currentOccupants: 0 },
  { id: 6, number: 201, capacity: 2, currentOccupants: 0 }
]


export const savedRooms = JSON.parse(localStorage.getItem('rooms'))

export const rooms = ref(savedRooms || defaultRooms)
console.log(rooms);

function saveRooms() {
  localStorage.setItem('rooms', JSON.stringify(rooms.value))
}

 function getRooms() {
  return rooms
}



export function addRoom(newRoom) {

  const exists = rooms.value.find(r => r.number === newRoom.number)

  if (exists) {
    return { success: false, message: "Numéro de chambre déjà utilisé" }
  }

  const room = {
    id: Date.now(),
    number: Number(newRoom.number),
    capacity: Number(newRoom.capacity),
    currentOccupants: 0
  }

  rooms.value.push(room)
  saveRooms()

  return { success: true, message: "Chambre ajoutée avec succès" }
}

export function deleteRoom(id) {
  rooms.value = rooms.value.filter(r => r.id !== id)
  saveRooms()
}
export default {getRooms,defaultRooms}