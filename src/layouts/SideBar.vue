<script setup>
import { computed } from 'vue'
import { currentUser, logout } from '@/services/authService'
import { useRouter } from 'vue-router'

const router = useRouter()
const role = computed(() => currentUser.value?.role)


// base du dashboard
const dashboardBase = computed(() => {
  if (!role.value) return '/'
  return `/dashboard-${role.value}`
})


// pour générer les liens enfants
const routePath = (child) => {
  if (!role.value) return '/'
  return `/dashboard-${role.value}/${child}`
}

const disconnect = () => {
  logout()
  router.replace('/')
}
</script>


<template>
  <aside class="w-64 min-h-screen bg-emerald-800 text-white flex flex-col justify-between">
    <!-- Logo -->
    <div>
      <div class="flex items-center gap-3 px-6 py-6 border-b border-emerald-700">
        <div class="text-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-activity text-white"
            data-fg-dqpt9="2.27:2.2865:/src/app/components/Sidebar.tsx:74:11:1647:45:e:Activity::::::Y0P">
            <path
              d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2">
            </path>
          </svg>
        </div>
        <div>
          <h1 class="font-bold text-lg">Hospital</h1>
          <p class="text-sm text-emerald-200">Gestion médicale</p>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="mt-6 space-y-2 px-4">
        <router-link :to="dashboardBase" v-if="role"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-700">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-layout-dashboard"
              data-fg-dqpt0="2.27:2.2865:/src/app/components/Sidebar.tsx:27:11:501:29:e:LayoutDashboard::::::Cv0O">
              <rect width="7" height="9" x="3" y="3" rx="1"></rect>
              <rect width="7" height="5" x="14" y="3" rx="1"></rect>
              <rect width="7" height="9" x="14" y="12" rx="1"></rect>
              <rect width="7" height="5" x="3" y="16" rx="1"></rect>
            </svg></span>
          <span>Dashboard</span>
        </router-link>

        <router-link :to="routePath('patient')" v-if="role"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-700 transition">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-users"
              data-fg-dqpt1="2.27:2.2865:/src/app/components/Sidebar.tsx:33:11:645:19:e:Users::::::DV8M">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg></span>
          <span>Patients</span>
        </router-link>


        <router-link :to="routePath('doctor')" v-if="role === 'admin'"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-700 transition">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-stethoscope"
              data-fg-dqpt2="2.27:2.2865:/src/app/components/Sidebar.tsx:39:11:778:25:e:Stethoscope::::::DCwV">
              <path d="M11 2v2"></path>
              <path d="M5 2v2"></path>
              <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"></path>
              <path d="M8 15a6 6 0 0 0 12 0v-3"></path>
              <circle cx="20" cy="10" r="2"></circle>
            </svg></span>
          <span>Médecins</span>
        </router-link>

        <router-link :to="routePath('receptioniste')" v-if="role === 'admin'"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-700 transition">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-stethoscope"
              data-fg-dqpt2="2.27:2.2865:/src/app/components/Sidebar.tsx:39:11:778:25:e:Stethoscope::::::DCwV">
              <path d="M11 2v2"></path>
              <path d="M5 2v2"></path>
              <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"></path>
              <path d="M8 15a6 6 0 0 0 12 0v-3"></path>
              <circle cx="20" cy="10" r="2"></circle>
            </svg></span>
          <span>Réceptioniste</span>
        </router-link>

        <router-link :to="routePath('appointment')" v-if="role"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-700 transition">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-calendar"
              data-fg-dqpt3="2.27:2.2865:/src/app/components/Sidebar.tsx:45:11:915:22:e:Calendar::::::Bbz4">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg></span>
          <span>Rendez-vous</span>
        </router-link>

        
        <router-link :to="routePath('room')" v-if="role !== 'doctor'"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-700 transition">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-bed"
              data-fg-dqpt4="2.27:2.2865:/src/app/components/Sidebar.tsx:51:11:1049:17:e:Bed::::::EI0x">
              <path d="M2 4v16"></path>
              <path d="M2 8h18a2 2 0 0 1 2 2v10"></path>
              <path d="M2 17h20"></path>
              <path d="M6 8v9"></path>
            </svg></span>
          <span>Chambres</span>
        </router-link>

        <router-link v-if="role === 'admin'" :to="routePath('users')"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-700 transition">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-user-cog"
              data-fg-dqpt5="2.27:2.2865:/src/app/components/Sidebar.tsx:57:11:1172:21:e:UserCog::::::5CY">
              <circle cx="18" cy="15" r="3"></circle>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M10 15H6a4 4 0 0 0-4 4v2"></path>
              <path d="m21.7 16.4-.9-.3"></path>
              <path d="m15.2 13.9-.9-.3"></path>
              <path d="m16.6 18.7.3-.9"></path>
              <path d="m19.1 12.2.3-.9"></path>
              <path d="m19.6 18.7-.4-1"></path>
              <path d="m16.8 12.3-.4-1"></path>
              <path d="m14.3 16.6 1-.4"></path>
              <path d="m20.7 13.8 1-.4"></path>
            </svg></span>
          <span>Utilisateurs</span>
        </router-link>
      </nav>
    </div>

    <!-- Logout -->
    <div class="px-4 py-6 border-t border-emerald-700">
      <button @click="disconnect"
        class="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-emerald-700 transition">
        <span>↩</span>
        <span>Déconnexion</span>
      </button>
    </div>
  </aside>
</template>

<style scoped></style>
