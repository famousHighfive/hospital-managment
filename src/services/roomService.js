import { onMounted, ref } from 'vue'

/*--------------------------------------------------------
TABLEAU DES CHAMBRES
---------------------------------------------------------*/
export const rooms = ref([
  { id: 1, number: "101", capacity: 2, status: "Occupée", patientName: "Jean Dupont" },
  { id: 2, number: "102", capacity: 1, status: "Libre", patientName: null },
  { id: 3, number: "201", capacity: 4, status: "Nettoyage", patientName: null },
  { id: 4, number: "202", capacity: 2, status: "Occupée", patientName: "Marie Curie" }
])

// Enregistrement et recuperation dans le local storage
localStorage.setItem('rooms', JSON.stringify(rooms.value))
onMounted(() => {
  rooms.value = localStorage.getItem('rooms') ? JSON.parse(localStorage.getItem('rooms')) : rooms.value
})