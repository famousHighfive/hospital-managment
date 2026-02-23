<script setup>
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-green-50">
    <div class="bg-white p-10 rounded-2xl shadow-lg text-center max-w-sm w-full">
      <h1 class="text-6xl font-extrabold text-green-600">401</h1>
      <h2 class="text-2xl font-semibold text-green-800 mt-4">Accès non autorisé</h2>
      <p class="text-gray-600 mt-2">
        Vous n’avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      <router-link
        to="/"
        class="inline-block mt-6 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        Retour à l’accueil
      </router-link>
    </div>
  </div>
</template>