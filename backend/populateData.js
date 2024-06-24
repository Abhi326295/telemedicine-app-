// backend/populateData.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const Appointment = require('./models/appointment.model');
const MedicalRecord = require('./models/medicalRecord.model');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', async () => {
  console.log("MongoDB database connection established successfully");

  await populateData();
  mongoose.disconnect();
});

async function populateData() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Appointment.deleteMany({});
    await MedicalRecord.deleteMany({});

    // Create users
    const patients = [
      { username: 'patient1', password: 'password1', role: 'patient', email: 'patient1@example.com', phone: '1234567890', firstName: 'John', lastName: 'Doe' },
      { username: 'patient2', password: 'password2', role: 'patient', email: 'patient2@example.com', phone: '0987654321', firstName: 'Jane', lastName: 'Doe' },
    ];

    const doctors = [
      { username: 'doctor1', password: 'password1', role: 'doctor', email: 'doctor1@example.com', phone: '1112223333', firstName: 'Alice', lastName: 'Smith', specialization: 'Cardiology', bio: 'Experienced cardiologist', profilePicture: 'http://example.com/doctor1.jpg' },
      { username: 'doctor2', password: 'password2', role: 'doctor', email: 'doctor2@example.com', phone: '4445556666', firstName: 'Bob', lastName: 'Johnson', specialization: 'Dermatology', bio: 'Experienced dermatologist', profilePicture: 'http://example.com/doctor2.jpg' },
    ];

    const hashedPatients = await Promise.all(patients.map(async (patient) => {
      const hashedPassword = await bcrypt.hash(patient.password, 10);
      return { ...patient, password: hashedPassword };
    }));

    const hashedDoctors = await Promise.all(doctors.map(async (doctor) => {
      const hashedPassword = await bcrypt.hash(doctor.password, 10);
      return { ...doctor, password: hashedPassword };
    }));

    const createdPatients = await User.insertMany(hashedPatients);
    const createdDoctors = await User.insertMany(hashedDoctors);

    // Create appointments
    const appointments = [
      { patient: createdPatients[0]._id, doctor: createdDoctors[0]._id, date: new Date(), reason: 'Chest pain', notes: 'Follow-up in two weeks', prescription: 'Aspirin' },
      { patient: createdPatients[1]._id, doctor: createdDoctors[1]._id, date: new Date(), reason: 'Skin rash', notes: 'Apply ointment daily', prescription: 'Hydrocortisone' },
    ];

    await Appointment.insertMany(appointments);

    // Create medical records
    const medicalRecords = [
      { patient: createdPatients[0]._id, doctor: createdDoctors[0]._id, diagnosis: 'Hypertension', medications: ['Lisinopril'], visitDate: new Date(), followUp: 'Check blood pressure daily' },
      { patient: createdPatients[1]._id, doctor: createdDoctors[1]._id, diagnosis: 'Eczema', medications: ['Hydrocortisone cream'], visitDate: new Date(), followUp: 'Apply cream twice daily' },
    ];

    await MedicalRecord.insertMany(medicalRecords);

    console.log('Sample data populated successfully');
  } catch (error) {
    console.error('Error populating data:', error);
  }
}
