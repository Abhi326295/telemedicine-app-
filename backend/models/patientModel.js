// backend/models/patientModel.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    condition: String,
    lastCheckUp: Date,
    nextAppointment: Date
});

module.exports = mongoose.model('Patient', patientSchema);
