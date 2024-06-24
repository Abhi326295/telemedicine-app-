// backend/models/appointment.model.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  notes: { type: String }, // Notes from the appointment
  prescription: { type: String } // Prescription details
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
