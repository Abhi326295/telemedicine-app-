// src/pages/MedicalRecords.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const result = await axios.get('/medical-records');
      setRecords(result.data);
    };

    fetchRecords();
  }, []);

  return (
    <div className="medical-records">
      <h2>My Medical Records</h2>
      <ul>
        {records.map(record => (
          <li key={record._id}>
            <p>Doctor: {record.doctor.username}</p>
            <p>Diagnosis: {record.diagnosis}</p>
            <p>Medications: {record.medications.join(', ')}</p>
            <p>Visit Date: {new Date(record.visitDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicalRecords;
