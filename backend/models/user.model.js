// backend/models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialization: { type: String }, // Only for doctors
  bio: { type: String }, // Optional biography for doctors
  profilePicture: { type: String } // URL to profile picture
});

const User = mongoose.model('User', userSchema);

module.exports = User;
