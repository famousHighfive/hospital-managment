import { ref } from "vue"

const token = localStorage.getItem('token')  // récupère le token
const API_URL = "http://localhost:3000/api/users"

export const users = ref([])

/* ======================
   GET USERS
====================== */
export async function getUsers() {
  const res = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`   // <- token ajouté
    }
  })
  const data = await res.json()

  users.value = Array.isArray(data) ? data : []
  return users
}

/* ======================
   ADD USER
====================== */
export async function addUser(user) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`   // <- token ajouté
    },
    body: JSON.stringify(user)
  })

  const newUser = await res.json()
  users.value.push(newUser)
  return newUser
}

/* ======================
   UPDATE USER
====================== */
export async function updateUser(user) {
  const res = await fetch(`${API_URL}/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`   // <- token ajouté
    },
    body: JSON.stringify(user)
  })

  const updated = await res.json()
  const index = users.value.findIndex(u => u.id === updated.id)
  if (index !== -1) {
    users.value[index] = updated
  }
  return updated
}

/* ======================
   DELETE USER
====================== */
export async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`   // <- token ajouté
    }
  })

  users.value = users.value.filter(u => u.id !== id)
}