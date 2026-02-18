import { ref } from 'vue'

// On vérifie si des patients existent déjà en localStorage
const storedPatients = localStorage.getItem('patients')

export const patients = ref(
  storedPatients
    ? JSON.parse(storedPatients)
    : [
        {
          id: 1,
          firstName: 'Jean',
          lastName: 'Dupont',
          gender: 'H',
          phone: '06 12 34 56 78',
          bloodGroup: 'A+',
          doctor: 'Dr. Laurent Blanc',
          room: '101',
          status: 'Hospitalisé',
          createdAt: '',
        },
        {
          id: 2,
          firstName: 'Marie',
          lastName: 'Martin',
          gender: 'F',
          phone: '06 23 45 67 89',
          bloodGroup: 'O+',
          doctor: 'Dr. Sophie Petit',
          room: '102',
          status: 'Hospitalisé',
          createdAt: '',
        },
        {
          id: 3,
          firstName: 'Pierre',
          lastName: 'Bernard',
          gender: 'H',
          phone: '06 34 56 78 90',
          bloodGroup: 'B+',
          doctor: 'Dr. Laurent Blanc',
          room: '56',
          status: 'En consultation',
          createdAt: '',
        },
        {
          id: 4,
          firstName: 'Sophie',
          lastName: 'Dubois',
          gender: 'F',
          phone: '06 45 67 89 01',
          bloodGroup: 'AB+',
          doctor: 'Dr. Marc Lefebvre',
          room: '309',
          status: 'Sorti',
          createdAt: '',
        },
      ],
)

const saveToLocalStorage = () => {
  localStorage.setItem('patients', JSON.stringify(patients.value))
}

export const addPatient = (newPatient) => {
  const newId = patients.value.length > 0 ? Math.max(...patients.value.map((p) => p.id)) + 1 : 1

  patients.value.push({
    id: newId,
    ...newPatient,
    createdAt: new Date().toISOString(),
  })

  saveToLocalStorage()
}

export const deletePatient = (id) => {
  patients.value = patients.value.filter((p) => p.id !== id)
  saveToLocalStorage()
}

/*
  🔎 Récupérer un patient par id
*/
export const getPatientById = (id) => {
  return patients.value.find((p) => p.id === Number(id))
}

/*
  ✏ Modifier un patient
*/
export const updatePatient = (updatedPatient) => {
  const index = patients.value.findIndex((p) => p.id === updatedPatient.id)

  if (index !== -1) {
    patients.value[index] = {
      ...patients.value[index],
      ...updatedPatient,
    }

    saveToLocalStorage()
  }
}
