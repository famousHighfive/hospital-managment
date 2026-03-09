import { ref } from "vue";

const API_URL = "http://localhost:3000/api"; // ton backend

/*--------------------------------------------------------
VARIABLE AUTHENTIFICATION
---------------------------------------------------------*/
export const isAuth = ref(localStorage.getItem('auth') === 'true');

/*--------------------------------------------------------
USER CONNECTE
---------------------------------------------------------*/
export const currentUser = ref(
  localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null
);

/*--------------------------------------------------------
CONNEXION - LOGIN
---------------------------------------------------------*/
export const login = async (email, password) => {
  if (!email.trim() || !password) {
    return { success: false, message: 'Champs vide...' };
  }

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Sauvegarde du token et infos utilisateur
      localStorage.setItem("auth", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      isAuth.value = true;
      currentUser.value = data.user;

      return { success: true, user: data.user };
    } else {
      return { success: false, message: data.message || "Erreur login" };
    }

  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur réseau" };
  }
};

/*--------------------------------------------------------
DECONNEXION - LOGOUT
---------------------------------------------------------*/
export const logout = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  isAuth.value = false;
  currentUser.value = null;
};

/*--------------------------------------------------------
RECUPERER L'UTILISATEUR CONNECTE
---------------------------------------------------------*/
export const fetchCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!response.ok) return null;

    const user = await response.json();
    currentUser.value = user;
    return user;

  } catch (error) {
    console.error(error);
    return null;
  }
};
