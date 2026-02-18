<template>
  <div class="space-y-8">
 
    <div class="grid grid-cols-3 gap-6">
 
      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-gray-500">Total Patients</h3>
        <p class="text-2xl font-bold mt-2">30</p>
      </div>
 
      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-gray-500">Patients hospitalisés</h3>
        <p class="text-2xl font-bold mt-2">12</p>
      </div>
 
      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-gray-500">Total Médecins</h3>
        <p class="text-2xl font-bold mt-2">10</p>
      </div>
 
      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-gray-500">Rendez-vous aujourd'hui</h3>
        <p class="text-2xl font-bold mt-2">25</p>
      </div>
 
      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-gray-500">Chambres occupées</h3>
        <p class="text-2xl font-bold mt-2">08</p>
      </div>
 
    </div>
 
    <div class="grid grid-cols-2 gap-6">
 
      <div class="bg-white p-6 rounded-xl shadow">
        <h3 class="text-lg font-semibold mb-6">Rendez-vous par semaine</h3>
 
        <div class="space-y-4">
 
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Lundi</span>
            <span class="font-semibold">12</span>
          </div>
 
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Mardi</span>
            <span class="font-semibold">18</span>
          </div>
 
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Mercredi</span>
            <span class="font-semibold">10</span>
          </div>
 
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Jeudi</span>
            <span class="font-semibold">22</span>
          </div>
 
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Vendredi</span>
            <span class="font-semibold">15</span>
          </div>
 
        </div>
      </div>
 
 
<div class="bg-white p-6 rounded-xl shadow mb-8">
 
  <div class="flex justify-between items-center mb-4">
    <h3 class="text-lg font-semibold">Taux d’occupation des chambres</h3>
    <span class="text-2xl font-bold text-emerald-600">65%</span>
  </div>
 
 
  <div class="w-full bg-gray-200 rounded-full h-3">
    <div
      class="bg-emerald-600 h-3 rounded-full"
      style="width: 65%;">
    </div>
  </div>
 
 
  <div class="flex justify-between text-sm text-gray-500 mt-3">
    <span>13 chambres occupées</span>
    <span>20 chambres totales</span>
  </div>
 
</div>
 
 
 
 
 
 
    </div>
    <div class=" w-full bg-white p-6 rounded-xl shadow">
  <h3 class="text-lg font-semibold mb-6">Activités récentes</h3>
 
  <div class="overflow-x-auto w-full">
    <table class="w-full text-sm text-left border-collapse">
      <thead>
        <tr class="border-b bg-gray-50 text-gray-600 uppercase text-xs">
          <th class="py-3 px-4">Type</th>
          <th class="py-3 px-4">Description</th>
          <th class="py-3 px-4">Utilisateur</th>
          <th class="py-3 px-4">Date</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
 
        <tr class="border-b hover:bg-gray-50">
          <td class="py-3 px-4">
            <span class="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs">
              Patient
            </span>
          </td>
          <td class="py-3 px-4">
            Ajout du patient Jean Dupont
          </td>
          <td class="py-3 px-4">
            Admin User
          </td>
          <td class="py-3 px-4 text-gray-500">
            16/06/2026 10:30
          </td>
        </tr>
 
        <tr class="border-b hover:bg-gray-50">
          <td class="py-3 px-4">
            <span class="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
              Rendez-vous
            </span>
          </td>
          <td class="py-3 px-4">
            Rendez-vous confirmé avec Dr. Martin
          </td>
          <td class="py-3 px-4">
            Réceptionniste
          </td>
          <td class="py-3 px-4 text-gray-500">
            16/06/2026 09:15
          </td>
        </tr>
 
        <tr class="hover:bg-gray-50">
          <td class="py-3 px-4">
            <span class="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
              Chambre
            </span>
          </td>
          <td class="py-3 px-4">
            Chambre 205 assignée
          </td>
          <td class="py-3 px-4">
            Admin User
          </td>
          <td class="py-3 px-4 text-gray-500">
            15/06/2026 17:40
          </td>
        </tr>
 
      </tbody>
 
    </table>
  </div>
</div>
 
  </div>
</template>