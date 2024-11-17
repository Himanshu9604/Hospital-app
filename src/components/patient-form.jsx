import React, { useState } from "react";
import "./PatientForm.css";
import PatientModal from "./patient-form-editable"; // Import Modal component
import notification from "../images/notification.wav"
function PatientForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [doctor, setDoctor] = useState("");
  const [bp, setBp] = useState("");
  const [weight, setWeight] = useState("");
  const [fee, setFee] = useState("");
  const [additionalFee, setAdditionalFee] = useState("");
  const [feesPaid, setFeesPaid] = useState("No");
  const [patientStatus, setPatientStatus] = useState("Pending");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [patients, setPatients] = useState(
    JSON.parse(localStorage.getItem("patients")) || []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Ensure fee and additionalFee are numbers (default to 0 if empty or invalid)
    const parsedFee = parseFloat(fee) || 0;
    const parsedAdditionalFee = parseFloat(additionalFee) || 0;
  
    // Calculate the total fee
    const totalFee = parsedFee + parsedAdditionalFee;
  
    // Create the patient data object
    const patientData = {
      name,
      city,
      age,
      mobile,
      doctor,
      bp,
      weight,
      fee: parsedFee, // Use parsed values for consistency
      additionalFee: parsedAdditionalFee,
      totalFee,
      date,
      feesPaid,
      status: "Pending",
      doneStatus: "",
    };
  
    // Add new patient to state and localStorage
    const updatedPatients = [...patients, patientData];
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
  
    // Reset form fields
    setName("");
    setCity("");
    setAge("");
    setMobile("");
    setDoctor("");
    setBp("");
    setWeight("");
    setFee("");
    setAdditionalFee("");
    setDate(new Date().toISOString().split("T")[0]); // Reset date to today's date
  };
  

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleSave = (editedPatient) => {
    const updatedPatients = patients.map((patient) =>
      patient.name === editedPatient.name ? editedPatient : patient
    );
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="form-container">
      <h2>Patient Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Existing form fields */}
        <div className="form-field">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Mobile Number:</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Doctor:</label>
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
          >
            <option value="Dr Amit Gulhane">Dr Amit Gulhane</option>
            <option value="Dr Mohini Gulhane">Dr Mohini Gulhane</option>
          </select>
        </div>

        <div className="form-field">
          <label>Blood Pressure (BP):</label>
          <input
            type="text"
            value={bp}
            onChange={(e) => setBp(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Weight (kg):</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Consultation Fee (₹):</label>
          <select value={fee} onChange={(e) => setFee(e.target.value)} required>
            <option value="0">₹0</option>
            <option value="100">₹100</option>
            <option value="150">₹150</option>
            <option value="200">₹200</option>
          </select>
        </div>       

        <div className="form-field">
          <label>Fees Paid:</label>
          <select
            value={feesPaid}
            onChange={(e) => setFeesPaid(e.target.value)}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-field">
          <label>Date of Visit:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Display patient records */}
      {patients.length > 0 && (
        <div className="table-container">
          <h3>Patient Records</h3>
          <table>
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Name</th>
                <th>City</th>
                <th>Age</th>
                <th>Mobile</th>
                <th>Doctor</th>
                <th>BP</th>
                <th>Weight</th>
                <th>Fee (₹)</th>
                <th>Additional Fees (₹)</th>
                <th>Total Fees Taken (₹)</th>
                <th>Fees Paid</th>
                <th>Patient Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleEdit(patient)}
                    >
                      {patient.name}
                    </button>
                  </td>
                  <td>{patient.city}</td>
                  <td>{patient.age}</td>
                  <td>{patient.mobile}</td>
                  <td>{patient.doctor}</td>
                  <td>{patient.bp}</td>
                  <td>{patient.weight}</td>
                  <td>{patient.fee}</td>
                  <td>{patient.additionalFee}</td>
                  <td>{patient.totalFee}</td>
                  <td>{patient.feesPaid}</td>
                  <td>
        <span
          style={{
            color: patient.status === "Accepted" ? "green" : patient.status === "Pending" ? "orange" : "black",
            fontWeight: "bold",
          }}
        >
          {patient.status}
        </span>
      </td>
                  <td>{patient.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isModalOpen && (
        <PatientModal
          patient={selectedPatient}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default PatientForm;
