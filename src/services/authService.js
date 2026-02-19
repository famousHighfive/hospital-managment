
import {  ref } from "vue"

/*--------------------------------------------------------
VARIABLE AUTHENTIFICATION
---------------------------------------------------------*/
export const isAuth = ref(localStorage.getItem('auth') === 'true')


/*--------------------------------------------------------
USER CONNECTE
---------------------------------------------------------*/
export const currentUser = ref(
    localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null
)

/*--------------------------------------------------------
TABLEAU DES PATIENTS
---------------------------------------------------------*/
export const fakeUsers = ref([
    { name: 'admin', email: 'admin@admin.com', password: '1234', role: 'admin' },
    { name: 'doctor', email: 'doctor@doctor.com', password: '12345', role: 'doctor' },
    { name: 'receptionniste Famous', email: 'reception@reception.com', password: '123456', role: 'receptioniste' }
])

console.log(fakeUsers);


// Enregistrement et recuperation dans le local storage
// localStorage.setItem('patients', JSON.stringify(fakeUsers.value))
// onMounted(() => {
// fakeUsers.value = localStorage.getItem('patients') ? JSON.parse(localStorage.getItem('patients')) : fakeUsers.value
// })


/*--------------------------------------------------------
CONNEXION - LOGIN
---------------------------------------------------------*/
export const login = (mail, pass) => {
    if (!mail.trim() || !pass) {
        return { success: false, message: 'Champs vide...' }
    }

    const foundUser = fakeUsers.value.find(u => u.email === mail && u.password === pass)

    if (foundUser) {
        localStorage.setItem('auth', 'true')
        localStorage.setItem('user', JSON.stringify(foundUser))
        isAuth.value = true
        currentUser.value = foundUser
        return { success: true, user: foundUser }
    } else {
        return { success: false, message: 'Identifiant incorrects...' }
    }
}


/*--------------------------------------------------------
DECONNEXION - LOGOUT
---------------------------------------------------------*/
export const logout = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('user')
    isAuth.value = false
    currentUser.value = null
}
