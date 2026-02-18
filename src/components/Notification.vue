<script setup>
import { onMounted } from 'vue'

defineProps({
  message: String,
  type: {
    type: String,
    default: 'success' // success | error | warning
  }
})

const emit = defineEmits(['close'])

onMounted(() => {
  setTimeout(() => {
    emit('close')
  }, 3000)
})
</script>

<template>
  <div class="fixed top-5 right-5 z-50 animate-slide-in">

    <div class="relative flex items-start gap-3 w-80 p-4 rounded-xl shadow-xl text-white overflow-hidden" :class="{
      'bg-emerald-600': type === 'success',
      'bg-red-600': type === 'error',
      'bg-amber-500': type === 'warning'
    }">

      <!-- Icon -->
      <div class="text-xl">
        <span v-if="type === 'success'">✅</span>
        <span v-else-if="type === 'error'" class="bg-white rounded-full p-1">❌</span>
        <span v-else>⚠️</span>
      </div>

      <!-- Message -->
      <div class="flex-1 text-sm font-medium">
        {{ message }}
      </div>

      <!-- Close button -->
      <button @click="$emit('close')" class="text-white/80 hover:text-white transition">
        ✕
      </button>

      <!-- Progress bar -->
      <div class="absolute bottom-0 left-0 h-1 bg-white/40 animate-progress"></div>
    </div>

  </div>
</template>

<style scoped>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(40px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes progress {
  from {
    width: 100%;
  }

  to {
    width: 0%;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}

.animate-progress {
  animation: progress 3s linear forwards;
}
</style>
