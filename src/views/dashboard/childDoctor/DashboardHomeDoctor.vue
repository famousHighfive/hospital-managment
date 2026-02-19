<script setup>
import { currentUser } from '@/services/authService';


</script>


<template>
<Header />

  <div class="dashboard-doctor">
  <main class="main-content">
    <h1 class="dach">DASHBOARD MEDECIN</h1>
    <h2 class="dr">Bienvenue, {{ currentUser.name}}</h2><br><br>

    <div class="stats">
<div class="card">
<h3><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg> Mes Patients</h3>
<p>2</p>
</div>
<div class="card">
<h3> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>Rendez-vous Aujourd'hui</h3>
<p>2</p>
</div>
<div class="card">
<h3> <div class="p-3 rounded-lg bg-accent text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-check" aria-hidden="true"><path d="m16 11 2 2 4-4"></path><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg></div> Patients Hospitalisés</h3>
<p>1</p>
</div>
</div>

    <section class="appointments">
<h2>Prochains rendez-vous</h2>
<table>
<thead>
<tr>
<th>Patient</th>
<th>Date</th>
<th>Heure</th>
<th>Statut</th>
</tr>
</thead>
<tbody>
<tr>
<td>Pierre Bernard</td>
<td>16/02/2026</td>
<td>09:00</td>
<td>Confirmé</td>
</tr>
<tr>
<td>Jean Dupont</td>
<td>16/02/2026</td>
<td>10:30</td>
<td>Confirmé</td>
</tr>
</tbody>
</table>
</section>

    <section class="hospitalized">
<h2>Mes patients hospitalisés</h2>
<table>
<thead>
<tr>
<th>Nom</th>
<th>Groupe sanguin
</th> <th>Chambre</th>
<th>Téléphone</th>
</tr>
</thead>
<tbody>
<tr>
<td>Jean Dupont</td>
<td>A+</td>
<td>1</td>
<td>06 12 34 56 78</td>
</tr>
</tbody>
</table>
</section>
</main>
</div>
</template>

<style scoped>
hr{
color: rgba(128, 128, 128, 0.568);
}
.active{
  display: flex;
  gap: 10px;
}

.hosp{
  display: flex;
  gap: 10px;
}

body {

  margin: 0;

  font-family: 'Segoe UI', sans-serif;

  background-color: #f4fef8;

  color: #333;

}

.dashboard-doctor {
position: relative;

  display: flex;

  min-height: 100vh;

}

.sidebar {

  width: 220px;

  background-color: #13664c;

  color: white;

  padding: 20px;

}

.sidebar h2 {

  font-size: 18px;

  margin-bottom: 30px;

}

.sidebar ul {

  list-style: none;

  padding: 0;

}

.sidebar li {

  margin: 15px 0;

  cursor: pointer;

  padding: 8px 12px;

  border-radius: 6px;

}

.sidebar li.active{
  background-color: rgba(255, 255, 255, 0.534);

}

.sidebar li:hover {

  background-color: #8eb1905b;

}

.main-content {

  flex: 1;

  padding: 30px;

  background-color: #f4fef8;

}

.main-content h1 {

  margin-bottom: 30px;

  color: #13664c;

}

.stats {

  display: flex;

  gap: 20px;

  margin-bottom: 40px;

}

.card {

  background-color: white;

  padding: 20px;

  border-left: 6px solid #13664c;

  border-radius: 8px;

  flex: 1;

  box-shadow: 0 2px 4px rgba(0, 128, 0, 0.1);

}
.card:hover{
    box-shadow: 0 2px 4px rgba(113, 128, 113, 0.692);
}

.card h3 {

  font-size: 14px;

  color: #388e3c;

  margin-bottom: 10px;

}

.card p {

  font-size: 28px;

  font-weight: bold;

  color: #2e7d32;

  margin: 0;

}

section {

  background-color: white;

  padding: 20px;

  border-radius: 8px;

  margin-bottom: 30px;

  box-shadow: 0 2px 4px rgba(0, 128, 0, 0.1);

}

section h2 {

  margin-bottom: 20px;

  color: #2e7d32;

}

table {

  width: 100%;

  border-collapse: collapse;

}

th,

td {

  padding: 12px;

  text-align: left;

  border-bottom: 1px solid #e0f2f1;

}

th {

  background-color: #e8f5e9;

  color: #388e3c;

  font-weight: 600;

}
.dr{
  color: black;

}
.dach{
  font-size: 40px;

}
tr:hover{
  box-shadow: 0 2px 4px rgba(0, 128, 0, 0.1);
  background-color: rgba(128, 128, 128, 0.137);
}
#decon{
  position: absolute;
  bottom: 5px;
}
</style>



