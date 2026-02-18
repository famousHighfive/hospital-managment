import { ref } from 'vue'
import { fakeUsers } from '@/services/authService' // 🔥 important

export const users = ref(
  JSON.parse(localStorage.getItem('users')) || []
)

function save() {
  localStorage.setItem('users', JSON.stringify(users.value))
}

export function getUsers() {
  return users
}

export function addUser(user) {
  user.id = Date.now()
  user.createdAt = new Date().toISOString()

  // ✅ Ajout dans users (gestion système)
  users.value.push(user)
  save()

  // 🔥 Ajout automatique dans fakeUsers (pour login)
  fakeUsers.value.push({
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role
  })
}

export function deleteUser(id) {
  const user = users.value.find(u => u.id === id)

  if (!user) return

  // Supprimer dans users
  users.value = users.value.filter(u => u.id !== id)
  save()

  // 🔥 Supprimer aussi dans fakeUsers
  fakeUsers.value = fakeUsers.value.filter(
    u => u.email !== user.email
  )
}
