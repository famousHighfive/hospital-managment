import { ref } from 'vue'
export const medicalSpecialities = [
  "Médecine Générale",
  "Cardiologie",
  "Dermatologie",
  "Neurologie",
  "Pédiatrie",
  "Gynécologie",
  "Ophtalmologie",
  "ORL",
  "Psychiatrie",
  "Radiologie",
  "Anesthésiologie",
  "Chirurgie Générale",
  "Chirurgie Orthopédique",
  "Neurochirurgie",
  "Urologie",
  "Gastro-entérologie",
  "Endocrinologie",
  "Oncologie",
  "Hématologie",
  "Néphrologie",
  "Rhumatologie",
  "Pneumologie",
  "Médecine Interne",
  "Urgences",
  "Médecine du Travail",
  "Médecine Légale",
  "Infectiologie",
  "Allergologie",
  "Gériatrie",
  "Nutrition",
  "Médecine du Sport",
  "Chirurgie Plastique",
  "Chirurgie Cardiaque",
  "Chirurgie Vasculaire",
  "Réanimation",
  "Radiothérapie"
]

export const doctors = ref(JSON.parse(localStorage.getItem('doctors')) || [])

function save() {
  localStorage.setItem('doctors', JSON.stringify(doctors.value))
}

export function getDoctors() {
  return doctors
}

export function addDoctor(doctor) {
  doctor.id = Date.now()
  doctor.userId = null // liaison utilisateur
  doctor.createdAt = new Date().toISOString()
  doctors.value.push(doctor)
  save()
}


export function updateDoctor(updatedDoctor) {
  const index = doctors.value.findIndex(d => d.id === updatedDoctor.id)
  if (index !== -1) {
    doctors.value[index] = updatedDoctor
    save()
  }
}

export function deleteDoctor(id) {
  doctors.value = doctors.value.filter(d => d.id !== id)
  save()
}
