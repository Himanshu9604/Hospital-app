// src/App.js
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard';
import Appointments from './components/appointments';
import OpdPatients from './components/opd-patients';
import IpdPatients from './components/ipd-patients';
import Revenue from './components/revenue-components';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Footer from './components/footer';
import PatientForm from './components/patient-form';
function App() {

  const [patients, setPatients] = useState([]);

  // Add new patient
  const addPatient = (patientData) => {
    setPatients((prevPatients) => [...prevPatients, patientData]);
  };
  return (
    <Router>
      <div className="App">
        {/* Header */}
        <Header />

        <div className="app-body">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/opd-patients" element={<OpdPatients />} />
              <Route path="/ipd-patients" element={<IpdPatients />} />
              <Route path="/revenue" element={<Revenue />} />
              <Route path="/prescription-forms" element={<Revenue />} />
              <Route path="/add-patient" element={<PatientForm addPatient={addPatient} />} />

            </Routes>
          </div>
        </div>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
