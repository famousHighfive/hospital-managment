<template>
  <div class="container">

    <div class="header">
      <div class="header-content">
        <div>
          <h1 class="title">Gestion des Rendez-vous</h1>
          <p class="subtitle">Gérer tous les rendez-vous</p>
        </div>
        <button class="btn-new" @click="openNewModal">
          <span>+</span> Nouveau Rendez-vous
        </button>
      </div>
    </div>


    <div class="table-wrapper">
      <table class="table" v-if="appointments.length > 0">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Médecin</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.id">
            <td>{{ appointment.patient }}</td>
            <td>{{ appointment.doctor }}</td>
            <td>{{ appointment.date }}</td>
            <td>{{ appointment.time }}</td>
            <td><span class="badge" :class="'status-' + appointment.status.toLowerCase().replace(' ', '-')">{{ appointment.status }}</span></td>
            <td class="actions">
              <button class="btn-action edit" @click="openEditModal(appointment)" title="Modifier">✏️</button>
              <button class="btn-action delete" @click="deleteAppointment(appointment.id)" title="Supprimer">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-state">
        <p>Aucun rendez-vous pour le moment</p>
      </div>
    </div>


    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>{{ isEditMode ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous' }}</h2>
          <button class="btn-close" @click="closeModal">✕</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label for="patient">Patient</label>
            <input
              v-model="form.patient"
              id="patient"
              type="text"
              placeholder="Nom du patient"
              @input="clearError('patient')"
            >
            <span v-if="errors.patient" class="error">{{ errors.patient }}</span>
          </div>

          <div class="form-group">
            <label for="doctor">Médecin</label>
            <select
              v-model="form.doctor"
              id="doctor"
              @change="clearError('doctor')"
            >
              <option value="">Sélectionnez un médecin</option>
              <option>Dr. Laurent Blanc</option>
              <option>Dr. Sophie Petit</option>
              <option>Dr. Marc Lefebvre</option>
              <option>Dr. Anne Durand</option>
              <option>Dr. Pierre Leclerc</option>
            </select>
            <span v-if="errors.doctor" class="error">{{ errors.doctor }}</span>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="date">Date</label>
              <input
                v-model="form.date"
                id="date"
                type="date"
                @input="clearError('date')"
              >
              <span v-if="errors.date" class="error">{{ errors.date }}</span>
            </div>

            <div class="form-group">
              <label for="time">Heure</label>
              <input
                v-model="form.time"
                id="time"
                type="time"
                @input="clearError('time')"
              >
              <span v-if="errors.time" class="error">{{ errors.time }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="status">Statut</label>
            <select
              v-model="form.status"
              id="status"
              @change="clearError('status')"
            >
              <option value="">Sélectionnez un statut</option>
              <option>Confirmé</option>
              <option>En attente</option>
              <option>Annulé</option>
            </select>
            <span v-if="errors.status" class="error">{{ errors.status }}</span>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="closeModal">Annuler</button>
          <button class="btn-submit" @click="saveAppointment">
            {{ isEditMode ? 'Modifier' : 'Créer' }}
          </button>
        </div>
      </div>
    </div>


    <div v-if="showDeleteConfirm" class="modal-overlay" @click="closeDeleteConfirm">
      <div class="modal confirm-modal" @click.stop>
        <div class="modal-header">
          <h2>Confirmer la suppression</h2>
          <button class="btn-close" @click="closeDeleteConfirm">✕</button>
        </div>

        <div class="modal-body">
          <p class="confirm-text">Êtes-vous sûr de vouloir supprimer ce rendez-vous ?</p>
          <p class="confirm-warning">Cette action ne peut pas être annulée.</p>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="closeDeleteConfirm">Non</button>
          <button class="btn-delete-confirm" @click="confirmDelete">Oui, supprimer</button>
        </div>
      </div>
    </div>


    <div v-if="toast.show" class="toast" :class="'toast-' + toast.type">
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppointmentManagement',
  data() {
    return {
      appointments: [
        {
          id: 1,
          patient: 'Pierre Bernard',
          doctor: 'Dr. Laurent Blanc',
          date: '16/02/2026',
          time: '09:00',
          status: 'Confirmé'
        },
        {
          id: 2,
          patient: 'Jean Dupont',
          doctor: 'Dr. Laurent Blanc',
          date: '16/02/2026',
          time: '10:30',
          status: 'Confirmé'
        },
        {
          id: 3,
          patient: 'Marie Martin',
          doctor: 'Dr. Sophie Petit',
          date: '16/02/2026',
          time: '14:00',
          status: 'En attente'
        },
        {
          id: 4,
          patient: 'Thomas Robert',
          doctor: 'Dr. Sophie Petit',
          date: '17/02/2026',
          time: '11:00',
          status: 'Confirmé'
        },
        {
          id: 5,
          patient: 'Sophie Dubois',
          doctor: 'Dr. Marc Lefebvre',
          date: '17/02/2026',
          time: '15:30',
          status: 'Annulé'
        }
      ],
      showModal: false,
      isEditMode: false,
      editingId: null,
      showDeleteConfirm: false,
      deleteConfirmId: null,
      form: {
        patient: '',
        doctor: '',
        date: '',
        time: '',
        status: ''
      },
      errors: {},
      toast: {
        show: false,
        message: '',
        type: 'success'
      }
    }
  },
  methods: {
    openNewModal() {
      this.resetForm();
      this.isEditMode = false;
      this.editingId = null;
      this.showModal = true;
    },

    openEditModal(appointment) {
      this.form = {
        patient: appointment.patient,
        doctor: appointment.doctor,
        date: this.formatDateForInput(appointment.date),
        time: appointment.time,
        status: appointment.status
      };
      this.isEditMode = true;
      this.editingId = appointment.id;
      this.errors = {};
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.resetForm();
    },

    resetForm() {
      this.form = {
        patient: '',
        doctor: '',
        date: '',
        time: '',
        status: ''
      };
      this.errors = {};
    },

    validateForm() {
      this.errors = {};

      if (!this.form.patient.trim()) {
        this.errors.patient = 'Le nom du patient est requis';
      }

      if (!this.form.doctor) {
        this.errors.doctor = 'Sélectionnez un médecin';
      }

      if (!this.form.date) {
        this.errors.date = 'La date est requise';
      }

      if (!this.form.time) {
        this.errors.time = 'L\'heure est requise';
      }

      if (!this.form.status) {
        this.errors.status = 'Sélectionnez un statut';
      }

      return Object.keys(this.errors).length === 0;
    },

    clearError(field) {
      if (this.errors[field]) {
        delete this.errors[field];
      }
    },

    formatDateForDisplay(dateString) {
      if (!dateString) return '';
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    },

    formatDateForInput(dateString) {
      if (!dateString) return '';
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    },

    saveAppointment() {
      if (!this.validateForm()) {
        this.showToast('Veuillez remplir tous les champs correctement', 'error');
        return;
      }

      if (this.isEditMode) {
        const appointmentIndex = this.appointments.findIndex(apt => apt.id === this.editingId);
        if (appointmentIndex !== -1) {
          this.appointments[appointmentIndex] = {
            id: this.editingId,
            patient: this.form.patient,
            doctor: this.form.doctor,
            date: this.formatDateForDisplay(this.form.date),
            time: this.form.time,
            status: this.form.status
          };
          this.showToast('Rendez-vous modifié avec succès', 'success');
        }
      } else {
        const newAppointment = {
          id: this.generateId(),
          patient: this.form.patient,
          doctor: this.form.doctor,
          date: this.formatDateForDisplay(this.form.date),
          time: this.form.time,
          status: this.form.status
        };
        this.appointments.push(newAppointment);
        this.showToast('Rendez-vous créé avec succès', 'success');
      }

      this.closeModal();
      this.saveToLocalStorage();
    },

    deleteAppointment(id) {
      this.deleteConfirmId = id;
      this.showDeleteConfirm = true;
    },

    closeDeleteConfirm() {
      this.showDeleteConfirm = false;
      this.deleteConfirmId = null;
    },

    confirmDelete() {
      if (this.deleteConfirmId !== null) {
        this.appointments = this.appointments.filter(apt => apt.id !== this.deleteConfirmId);
        this.showToast('Rendez-vous supprimé avec succès', 'success');
        this.saveToLocalStorage();
        this.closeDeleteConfirm();
      }
    },

    generateId() {
      return Math.max(...this.appointments.map(apt => apt.id), 0) + 1;
    },

    showToast(message, type = 'success') {
      this.toast = {
        show: true,
        message: message,
        type: type
      };

      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },

    saveToLocalStorage() {
      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    },

    loadFromLocalStorage() {
      const saved = localStorage.getItem('appointments');
      if (saved) {
        try {
          this.appointments = JSON.parse(saved);
        } catch (e) {
          console.error('Erreur lors du chargement des rendez-vous', e);
        }
      }
    }
  },
  mounted() {
    this.loadFromLocalStorage();
  }
}
</script>

<style scoped>
.container {
  padding: 40px;
  background-color: #f5f5f5;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.header {
  margin-bottom: 30px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.btn-new {
  padding: 12px 24px;
  background-color: #1db584;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;
}

.btn-new:hover {
  background-color: #17a071;
}

.table-wrapper {
  background: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead {
  background-color: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
}

.table th {
  padding: 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
  text-transform: capitalize;
}

.table td {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  color: #1a1a1a;
}

.table tbody tr:hover {
  background-color: #fafafa;
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.badge.status-confirmé {
  background-color: #1db584;
  color: white;
}

.badge.status-en-attente {
  background-color: #fff3e0;
  color: #e67e22;
  border: 1px solid #ffcc99;
}

.badge.status-annulé {
  background-color: #f44336;
  color: white;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.btn-action {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  opacity: 0.6;
  transition: opacity 0.2s;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-action:hover {
  opacity: 1;
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: #999;
  font-size: 16px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  transition: color 0.2s;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close:hover {
  color: #1a1a1a;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #1db584;
  box-shadow: 0 0 0 3px rgba(29, 181, 132, 0.1);
}

.error {
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  justify-content: flex-end;
}

.btn-cancel,
.btn-submit {
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel {
  background-color: #f0f0f0;
  color: #1a1a1a;
}

.btn-cancel:hover {
  background-color: #e0e0e0;
}

.btn-submit {
  background-color: #1db584;
  color: white;
}

.btn-submit:hover {
  background-color: #17a071;
}

.confirm-modal {
  max-width: 400px;
}

.confirm-text {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.confirm-warning {
  font-size: 13px;
  color: #f44336;
  margin: 0;
}

.btn-delete-confirm {
  background-color: #f44336;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-delete-confirm:hover {
  background-color: #d32f2f;
}

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 16px 24px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 2000;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.toast-success {
  background-color: #1db584;
  color: white;
}

.toast-error {
  background-color: #f44336;
  color: white;
}

.toast-warning {
  background-color: #ff9800;
  color: white;
}
</style>
 