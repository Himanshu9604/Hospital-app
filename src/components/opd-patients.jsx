import React, { useEffect, useState } from "react";
import "./OpdPatients.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid
} from "@mui/material";

function OpdPatients() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [notes, setNotes] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", quantity: "", timing: "", meal: "" },
  ]);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(storedPatients);
  }, []);

  const handleAccept = (index) => {
    const updatedPatients = [...patients];
    updatedPatients[index].status = "Accepted";
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
  };

  const handleStatusChange = (index, status) => {
    const updatedPatients = [...patients];
    updatedPatients[index].doneStatus = status;
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
  };

  const handleAddMedicine = () => {
    setMedicines([
      ...medicines,
      { name: "", quantity: "", timing: "", meal: "" },
    ]);
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setMedicines([{ name: "", quantity: "", timing: "", meal: "" }]); // Reset medicines for a new patient
    setNotes(""); // Reset notes for a new patient
  };

  return (
    <div className="opd-patients">
      <h2>OPD Patients</h2>
      <div className="watermark">Get Well Soon</div>

      {patients.length === 0 ? (
        <p>No patients have been added yet.</p>
      ) : (
        <table className="patients-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>City</th>
              <th>Age</th>
              <th>Mobile</th>
              <th>Doctor</th>
              <th>BP</th>
              <th>Weight</th>
              <th>Incoming Patient</th>
              <th>Done Patient</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td
                  className="clickable-name"
                  onClick={() => handlePatientClick(patient)}
                >
                  {patient.name}
                </td>
                <td>{patient.city}</td>
                <td>{patient.age}</td>
                <td>{patient.mobile}</td>
                <td>{patient.doctor}</td>
                <td>{patient.bp}</td>
                <td>{patient.weight}</td>
                <td>
                  {patient.status === "Pending" ? (
                    <button onClick={() => handleAccept(index)}>Accept</button>
                  ) : (
                    <span>Accepted</span>
                  )}
                </td>
                <td>
                  <select
                    value={patient.doneStatus || ""}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="Done">Done</option>
                    <option value="Need to Blood Test">
                      Need to Blood Test
                    </option>
                    <option value="Need to Admit">Need to Admit</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

{selectedPatient && (
  <Dialog
    open={Boolean(selectedPatient)}
    onClose={() => setSelectedPatient(null)}
    fullWidth
    maxWidth="sm"
  >
   <DialogTitle
      style={{
        backgroundColor: "#f0f0f0",
        borderBottom: "2px solid #ccc",
        padding: "20px 0"
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} style={{ textAlign: "left" }}>
          <h3 style={{ margin: "0",textAlign:'center' }}>Gulhane Hospital</h3>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "left" }}>
          <p style={{ margin: "0" }}><strong>Dr. Amit Gulhane</strong> (MBBS, MD)</p>
          <p>Contact: +91-9876543210</p>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "left" }}>
          <p style={{ margin: "0" }}><strong>Dr. Mohini Gulhane</strong> (MBBS, MD)</p>
          <p>Contact: +91-9876543210</p>
        </Grid>
      </Grid>
      
    </DialogTitle>
    <DialogContent>
      {/* Patient Info Section */}
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <p><strong>Name:</strong> {selectedPatient.name}</p>
        </Grid>
        <Grid item xs={6}>
          <p><strong>Age:</strong> {selectedPatient.age}</p>
        </Grid>
        <Grid item xs={6}>
          <p><strong>City:</strong> {selectedPatient.city}</p>
        </Grid>
        <Grid item xs={6}>
          <p><strong>Mobile:</strong> {selectedPatient.mobile}</p>
        </Grid>
        <Grid item xs={6}>
          <p><strong>Doctor:</strong> {selectedPatient.doctor}</p>
        </Grid>
        <Grid item xs={6}>
          <p><strong>BP:</strong> {selectedPatient.bp}</p>
        </Grid>
        <Grid item xs={6}>
          <p><strong>Weight:</strong> {selectedPatient.weight}</p>
        </Grid>
      </Grid>

      <hr />

      {/* Notes Section */}
      <h4>Notes</h4>
      <TextField
        multiline
        rows={3}
        fullWidth
        variant="outlined"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write notes here..."
        style={{ marginBottom: "20px" }}
      />

      {/* Medicines Section */}
      <h4>Medicines</h4>
      {medicines.map((medicine, index) => (
        <div key={index} className="medicine-row" style={{ marginBottom: "20px" }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="Medicine Name"
                value={medicine.name}
                onChange={(e) =>
                  handleMedicineChange(index, "name", e.target.value)
                }
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Quantity"
                type="number"
                value={medicine.quantity}
                onChange={(e) =>
                  handleMedicineChange(index, "quantity", e.target.value)
                }
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Timing (Day/Afternoon/Night)"
                select
                value={medicine.timing}
                onChange={(e) =>
                  handleMedicineChange(index, "timing", e.target.value)
                }
                fullWidth
                variant="outlined"
              >
                <MenuItem value="Day">Day (दिवस)</MenuItem>
                <MenuItem value="Afternoon">Afternoon (दोपारी)</MenuItem>
                <MenuItem value="Night">Night (रात्रि)</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                label="Meal Time"
                value={medicine.meal}
                onChange={(e) =>
                  handleMedicineChange(index, "meal", e.target.value)
                }
                fullWidth
                variant="outlined"
              >
                <MenuItem value="Before Lunch">Before Lunch (जेवणाआधी)</MenuItem>
                <MenuItem value="After Lunch">After Lunch (जेवणानंतर)</MenuItem>
                <MenuItem value="Empty stomach">Empty stomach (रिकाम्या पोटी)</MenuItem>
                <MenuItem value="After Dinner">After Dinner (रात्री जेवणानंतर)</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </div>
      ))}
      <Button onClick={handleAddMedicine}>Add Medicine</Button>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setSelectedPatient(null)} color="secondary">
        Close
      </Button>
      <Button onClick={handlePrint} variant="contained" color="primary">
        Print
      </Button>
    </DialogActions>
  </Dialog>
)}

    </div>
  );
}

export default OpdPatients;
