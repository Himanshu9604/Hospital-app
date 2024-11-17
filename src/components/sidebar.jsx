import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { 
  FaTachometerAlt, 
  FaUserMd, 
  FaClipboardList, 
  FaUsers, 
  FaHospitalAlt, 
  FaChartLine, 
  FaFilePrescription
} from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/"><FaTachometerAlt className="sidebar-icon" /> Dashboard</Link></li>
        <li><Link to="/add-patient"><FaUserMd className="sidebar-icon" /> Patient Form</Link></li>
        <li><Link to="/appointments"><FaClipboardList className="sidebar-icon" /> Lab</Link></li>
        <li><Link to="/opd-patients"><FaUsers className="sidebar-icon" /> OPD Patients</Link></li>
        <li><Link to="/ipd-patients"><FaHospitalAlt className="sidebar-icon" /> IPD Patients</Link></li>
        <li><Link to="/prescription-forms"><FaFilePrescription className="sidebar-icon" /> Prescription Forms</Link></li>
        <li><Link to="/revenue"><FaChartLine className="sidebar-icon" /> Total Revenue</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
