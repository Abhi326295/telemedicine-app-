// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes');
const { mongoURI } = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/patients', patientRoutes);

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
