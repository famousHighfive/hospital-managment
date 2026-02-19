
import {ref } from "vue"

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



const storedUsers = localStorage.getItem('users')



/*--------------------------------------------------------
TABLEAU DES PATIENTS
---------------------------------------------------------*/
export const fakeUsers = ref( storedUsers ? JSON.parse(storedUsers) : [
  {
    id: Date.now(),
    name: 'admin',
    email: 'admin@admin.com',
    password: '1234',
    role: 'admin',
    createdAt: new Date('2024-01-01T10:00:00Z')
  },
  {
    id: Date.now(),
    name: 'doctor',
    email: 'doctor@doctor.com',
    password: '12345',
    role: 'doctor',
    createdAt: new Date('2024-01-15T08:30:00Z')
  },
  {
    id: Date.now(),
    name: 'receptionniste Famous',
    email: 'reception@reception.com',
    password: '123456',
    role: 'receptioniste',
    createdAt: new Date()
  }
])

localStorage.setItem('users', JSON.stringify(fakeUsers.value))
console.log(fakeUsers);


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
