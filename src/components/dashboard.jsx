import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Ensure you have a CSS file for styling

function Dashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  const countPatients = (filterType) => {
    const currentDate = new Date();

    const isSameDay = (date1, date2) => {
      return date1.toDateString() === date2.toDateString();
    };

    return patients.filter(patient => {
      const patientDate = new Date(patient.date);

      if (filterType === 'today') {
        return isSameDay(patientDate, currentDate);
      } else if (filterType === 'month') {
        return patientDate.getMonth() === currentDate.getMonth() && patientDate.getFullYear() === currentDate.getFullYear();
      } else if (filterType === 'year') {
        return patientDate.getFullYear() === currentDate.getFullYear();
      }
      return false;
    }).length;
  };

  const countTotalPatients = () => {
    return patients.length;
  };

  const countAcceptedPatients = () => {
    return patients.filter(patient => patient.status === 'Accepted').length;
  };

  return (
    <div className="dashboard">
      <div className="stats-container">
        <div className="stats-card">
          <h3>Total Registered Patients</h3>
          <p>{countTotalPatients()}</p>
        </div>

        <div className="stats-card">
          <h3>Total Accepted Patients</h3>
          <p>{countAcceptedPatients()}</p>
        </div>
      </div>

      <div className="stats-container">
        <div className="stats-card">
          <h3>Total OPD Patients Today</h3>
          <p>{countPatients('today')}</p>
        </div>

        <div className="stats-card">
          <h3>Total OPD Patients This Month</h3>
          <p>{countPatients('month')}</p>
        </div>

        <div className="stats-card">
          <h3>Total OPD Patients This Year</h3>
          <p>{countPatients('year')}</p>
        </div>
      </div>
    </div>
  );
}


export default Dashboard;
