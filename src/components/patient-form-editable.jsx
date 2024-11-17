import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./Edit-Patient.css";

function PatientModal({ patient, onClose, onSave }) {
  const [editedPatient, setEditedPatient] = useState(patient);

  useEffect(() => {
    setEditedPatient(patient);
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setEditedPatient((prev) => {
      // Parse fee and additionalFee as numbers, defaulting to 0 if empty
      const updatedFee = name === "fee" ? parseFloat(value) || 0 : parseFloat(prev.fee) || 0;
      const updatedAdditionalFee =
        name === "additionalFee" ? parseFloat(value) || 0 : parseFloat(prev.additionalFee) || 0;
  
      // Calculate the new totalFee
      const updatedTotalFee = updatedFee + updatedAdditionalFee;
  
      // Update the state with the new totalFee
      return {
        ...prev,
        [name]: value,
        totalFee: updatedTotalFee,
      };
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedPatient);
    Swal.fire({
      title: "Success!",
      text: "Your patient details are updated.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedPatient.name}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="form-field">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={editedPatient.city}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="form-field">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={editedPatient.age}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="form-field">
            <label>Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={editedPatient.mobile}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="form-field">
            <label>Doctor:</label>
            <select
              name="doctor"
              value={editedPatient.doctor}
              onChange={handleChange}
              className="input-field"
            >
              <option value="Dr Amit Gulhane">Dr Amit Gulhane</option>
              <option value="Dr Mohini Gulhane">Dr Mohini Gulhane</option>
            </select>
          </div>

          <div className="form-field">
            <label>Blood Pressure (BP):</label>
            <input
              type="text"
              name="bp"
              value={editedPatient.bp}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="form-field">
            <label>Weight (kg):</label>
            <input
              type="text"
              name="weight"
              value={editedPatient.weight}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="form-field">
            <label>Consultation Fee (₹):</label>
            <select
              name="fee"
              value={editedPatient.fee}
              onChange={handleChange}
              className="input-field"
            >
              <option value="0">₹0</option>
              <option value="100">₹100</option>
              <option value="150">₹150</option>
              <option value="200">₹200</option>
            </select>
          </div>

          <div className="form-field">
            <label>Additional Fee (₹):</label>
            <input
              type="number"
              name="additionalFee"
              value={editedPatient.additionalFee || ""}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="form-field">
            <label>Fees Paid:</label>
            <select
              name="feesPaid"
              value={editedPatient.feesPaid}
              onChange={handleChange}
              className="input-field"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-field">
            <label>Date of Visit:</label>
            <input
              type="date"
              name="date"
              value={editedPatient.date}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="button-container">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="button" onClick={onClose} className="close-btn">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientModal;
