import { onMounted, ref } from "vue";


// Déclaration réactive du tableau de docteurs
export const doctors = ref([
  { id: 1, name: "Dr. House", speciality: "Diagnostic", phone: "0102030405", available: true },
  { id: 2, name: "Dr. Strange", speciality: "Neurochirurgie", phone: "0607080910", available: false },
  { id: 3, name: "Dr. Quinn", speciality: "Généraliste", phone: "0405060708", available: true }
])

// Enregistrement et recuperation dans le local storage
localStorage.setItem('doctors', JSON.stringify(doctors.value))
onMounted(() => {
  doctors.value = localStorage.getItem('doctors') ? JSON.parse(localStorage.getItem('doctors')) : doctors.value
})