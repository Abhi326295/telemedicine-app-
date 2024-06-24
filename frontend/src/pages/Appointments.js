// src/pages/Appointments.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const result = await axios.get('/appointments');
      setAppointments(result.data);
    };

    fetchAppointments();
  }, []);

  return (
    <div className="appointments">
      <h2>My Appointments</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment._id}>
            <p>Doctor: {appointment.doctor.username}</p>
            <p>Date: {new Date(appointment.date).toLocaleString()}</p>
            <p>Reason: {appointment.reason}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
