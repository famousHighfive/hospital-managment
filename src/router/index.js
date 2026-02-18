
import { currentUser, isAuth } from '@/services/authService'
import Login from '@/views/authServices/Login.vue'
import AppointmentAdmin from '@/views/dashboard/childAdmin/AppointmentAdmin.vue'
import DashboardHomeAdmin from '@/views/dashboard/childAdmin/DashboardHomeAdmin.vue'
import DoctorAdmin from '@/views/dashboard/childAdmin/DoctorAdmin.vue'
import PatientAdmin from '@/views/dashboard/childAdmin/PatientAdmin.vue'
import ReceptionistAdmin from '@/views/dashboard/childAdmin/ReceptionistAdmin.vue'
import RoomAdmin from '@/views/dashboard/childAdmin/RoomAdmin.vue'
import UsersAdmin from '@/views/dashboard/childAdmin/UsersAdmin.vue'
import AppointmentDoctor from '@/views/dashboard/childDoctor/AppointmentDoctor.vue'
import DashboardHomeDoctor from '@/views/dashboard/childDoctor/DashboardHomeDoctor.vue'
import PatientDoctor from '@/views/dashboard/childDoctor/PatientDoctor.vue'
import AppointmentReception from '@/views/dashboard/childReception/AppointmentReception.vue'
import DashboardHomeReception from '@/views/dashboard/childReception/DashboardHomeReception.vue'
import DoctorReception from '@/views/dashboard/childReception/DoctorReception.vue'
import PatientInfoPage from '@/views/dashboard/childReception/PatientInfoPage.vue'
import PatientReception from '@/views/dashboard/childReception/PatientReception.vue'
import RoomReception from '@/views/dashboard/childReception/RoomReception.vue'
import DashboardAdmin from '@/views/dashboard/DashboardAdmin.vue'
import DashboardDoctor from '@/views/dashboard/DashboardDoctor.vue'
import DashboardReceptioniste from '@/views/dashboard/DashboardReceptioniste.vue'
import Unauthentificated from '@/views/Unauthentificated.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
      // ================= DASHBOARD =================
    {
      path: '/dashboard-admin',
      name: 'dashboard-admin',
      component: DashboardAdmin,
      meta: { requiresAuth: true, role: 'admin' },
      children: [
        { path: '', name: 'dashboard-admin-home', component: DashboardHomeAdmin },
        { path: 'patient', name: 'dashboard-admin-patient', component: PatientAdmin, children: [{ path: ':id', name: 'patient-info-detail', component: PatientInfoPage }] },
        { path: 'doctor', name: 'dashboard-admin-doctor', component: DoctorAdmin },
        { path: 'receptionist', name: 'dashboard-admin-receptionist', component: ReceptionistAdmin },
        { path: 'appointment', name: 'dashboard-admin-appointment', component: AppointmentAdmin },
        { path: 'room', name: 'dashbord-admin-room', component: RoomAdmin },
        { path: 'users', name: 'dashboard-admin-users', component: UsersAdmin },
        ]
    },
    {
      path: '/dashboard-doctor',
      name: 'dashboard-doctor',
      component: DashboardDoctor,
      meta: { requiresAuth: true, role: 'doctor' },
          children: [
        { path: '', name: 'dashboard-doctor-home', component: DashboardHomeDoctor },
        { path: 'patient', name: 'dashboard-doctor-patient', component: PatientDoctor },
        { path: 'appointment', name: 'dashboard-doctor-appointment', component: AppointmentDoctor },
        ]
    },
    {
      path: '/dashboard-receptioniste',
      name: 'dashboard-receptioniste',
      component: DashboardReceptioniste,
      meta: { requiresAuth: true, role: 'receptioniste' },
      children: [
        { path: '', name: 'dashboard-receptioniste-home', component: DashboardHomeReception },
        { path: 'patient', name: 'dashboard-receptioniste-patient', component: PatientReception, children: [{ path: ':id', name: 'patient-info-detail', component: PatientInfoPage }] },
        { path: 'doctor', name: 'dashboard-receptioniste-doctor', component: DoctorReception },
        { path: 'appointment', name: 'dashboard-receptioniste-appointment', component: AppointmentReception },
        { path: 'room', name: 'dashboard-receptioniste-room', component: RoomReception },
        ]
    },
    {
      path: '/unauthentificated',
      component: Unauthentificated
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }

  ],
})


router.beforeEach((to, from, next) => {

  // si la page required un auth et il y en a pas
  if (to.meta.requiresAuth && !isAuth.value) {
    return next('/')
  }

  // si la route exige un role specifique
  if (to.meta.role) {
    // Donc on entre dans ce bloc seulement si un rôle est défini

    // récupère le rôle du user connecté
    const role = currentUser.value?.role

    // si admin ? toujours autoriser
    if (role === 'admin') {
      return next()
    }

    // on vérifie si le rôle attendu est un tableau
    if (Array.isArray(to.meta.role)) {

      // le rôle de l'utilisateur n’est PAS dans le tableau
      if (!to.meta.role.includes(role)) {
        return next('/unauthentificated')
      }

    } else {
      // cas dun seul role || l’utilisateur n’est pas le role → accès refusé.
      if (to.meta.role !== role) {
        return next('/unauthentificated')
      }
    }
  }

  // empêcher un user connecté d'aller sur login
  if (to.name === 'login' && isAuth.value) {

    const role = currentUser.value?.role

    // redirection - chaque rôle a son dashboard
    if (role === 'admin') return next('/dashboard-admin')
    if (role === 'doctor') return next('/dashboard-doctor')
    if (role === 'receptioniste') return next('/dashboard-receptioniste')
  }

  // Si aucune condition ne bloque la navigation - on laisse passer.
  next()
})

export default router
