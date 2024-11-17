import React from "react";
import "./Header.css";
import img from '../images/new-doc-img.png'
function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
      <img
          className="logo"
          src={img} // Corrected path for your logo
          alt="Hospital Logo"
        />
        <div className="hospital-details">
          <h1 className="hospital-name">Gulhane Hospital</h1>
          <p className="hospital-subname">गुल्हाने हॉस्पिटल</p>
        </div>
      </div>
      <div className="header-right">
        <div className="contact-info">
          <p className="contact-item">
            <img
              className="icon"
              src="https://cdn-icons-png.flaticon.com/512/455/455705.png"
              alt="Phone Icon"
            />{" "}
            +91-9876543210
          </p>
          <p className="contact-item">
            <img
              className="icon"
              src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
              alt="Email Icon"
            />{" "}
            info@gulhanehospital.com
          </p>
        </div>
        <img
          className="doctor-image"
          src="https://cdn-icons-png.flaticon.com/512/921/921071.png"
          alt="Doctor"
        />
      </div>
    </header>
  );
}

export default Header;
