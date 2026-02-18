<script setup>
import Notification from '@/components/Notification.vue';
import { login } from '@/services/authService';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const form = reactive({email: '', password: ''})
const showNotif = ref(false)
const msg = ref('')
const type = ref('')



const submitForm = () => {
  const response = login(form.email, form.password)

  if(response.success){
    if(response.user.role === 'admin') router.push('/dashboard-admin')
    if(response.user.role === 'doctor') router.push('/dashboard-doctor')
    if(response.user.role === 'receptioniste') router.push('/dashboard-receptioniste')
  }else{
    msg.value = response.message
    type.value = 'error'
    showNotif.value = true
    form.email = ''
    form.password = ''
  }
}



</script>


<template>
  <Notification v-if="showNotif" :message="msg" :type="type" @close="showNotif = false" />
  <div class="min-h-screen bg-emerald-50 flex items-center justify-center px-4">

    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

      <!-- Logo -->
      <div class="flex flex-col items-center mb-8">
        <div class="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="50px" width="50px"
            version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
            <g transform="translate(0 -1)">
              <g>
                <path style="fill:#ECF0F1;"
                  d="M332.8,205.801c-4.719,0-8.533-3.814-8.533-8.533v-42.667c0-4.719,3.814-8.533,8.533-8.533    s8.533,3.814,8.533,8.533v42.667C341.333,201.987,337.519,205.801,332.8,205.801" />
                <path style="fill:#ECF0F1;"
                  d="M435.2,205.801c-4.719,0-8.533-3.814-8.533-8.533v-42.667c0-4.719,3.814-8.533,8.533-8.533    c4.719,0,8.533,3.814,8.533,8.533v42.667C443.733,201.987,439.919,205.801,435.2,205.801" />
                <polygon style="fill:#ECF0F1;" points="25.6,470.332 264.533,470.332 264.533,77.799 25.6,77.799   " />
              </g>
              <polygon style="fill:#B0BAC1;" points="264.533,470.332 486.4,470.332 486.4,197.265 264.533,197.265  " />
              <polygon style="fill:#D75A4A;" points="298.667,154.599 469.333,154.599 469.333,35.132 298.667,35.132  " />
              <g>
                <path style="fill:#FFFFFF;"
                  d="M366.933,129.001c-4.719,0-8.533-3.814-8.533-8.533v-51.2c0-4.719,3.814-8.533,8.533-8.533    c4.719,0,8.533,3.814,8.533,8.533v51.2C375.467,125.187,371.652,129.001,366.933,129.001" />
                <path style="fill:#FFFFFF;"
                  d="M401.067,129.001c-4.719,0-8.533-3.814-8.533-8.533v-51.2c0-4.719,3.814-8.533,8.533-8.533    c4.719,0,8.533,3.814,8.533,8.533v51.2C409.6,125.187,405.786,129.001,401.067,129.001" />
                <path style="fill:#FFFFFF;"
                  d="M401.067,103.401h-34.133c-4.719,0-8.533-3.814-8.533-8.533s3.814-8.533,8.533-8.533h34.133    c4.719,0,8.533,3.814,8.533,8.533S405.786,103.401,401.067,103.401" />
              </g>
              <g>
                <polygon style="fill:#556080;"
                  points="119.467,470.332 170.667,470.332 170.667,402.065 119.467,402.065   " />
                <polygon style="fill:#556080;"
                  points="68.267,171.665 119.467,171.665 119.467,120.465 68.267,120.465   " />
                <polygon style="fill:#556080;"
                  points="170.667,171.665 221.867,171.665 221.867,120.465 170.667,120.465   " />
                <polygon style="fill:#556080;"
                  points="68.267,265.532 119.467,265.532 119.467,214.332 68.267,214.332   " />
                <polygon style="fill:#556080;"
                  points="170.667,265.532 221.867,265.532 221.867,214.332 170.667,214.332   " />
                <polygon style="fill:#556080;"
                  points="68.267,359.399 119.467,359.399 119.467,308.199 68.267,308.199   " />
                <polygon style="fill:#556080;" points="307.2,308.199 358.4,308.199 358.4,256.999 307.2,256.999   " />
                <polygon style="fill:#556080;" points="307.2,402.065 358.4,402.065 358.4,350.865 307.2,350.865   " />
                <polygon style="fill:#556080;"
                  points="392.533,308.199 443.733,308.199 443.733,256.999 392.533,256.999   " />
                <polygon style="fill:#556080;"
                  points="392.533,402.065 443.733,402.065 443.733,350.865 392.533,350.865   " />
                <polygon style="fill:#556080;"
                  points="170.667,359.399 221.867,359.399 221.867,308.199 170.667,308.199   " />
                <path style="fill:#556080;"
                  d="M503.467,478.868H8.533c-4.719,0-8.533-3.814-8.533-8.533c0-4.719,3.814-8.533,8.533-8.533h494.933    c4.719,0,8.533,3.814,8.533,8.533C512,475.054,508.186,478.868,503.467,478.868" />
              </g>
            </g>
          </svg>
        </div>
        <h1 class="mt-6 text-2xl font-bold text-gray-800">
          Connexion
        </h1>
        <p class="text-gray-500 text-sm">
          Gestion Hôpital
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-6">

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input type="email" v-model="form.email" placeholder="exemple@hospital.com"
            class="w-full px-4 py-3 rounded-lg bg-gray-100 border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition" />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe
          </label>
          <input type="password" v-model="form.password" placeholder="••••••••"
            class="w-full px-4 py-3 rounded-lg bg-gray-100 border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition" />
        </div>

        <!-- Button -->
        <button type="submit"
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition duration-200 shadow-md">
          Se connecter
        </button>

      </form>

    </div>

  </div>
</template>


<style scoped></style>