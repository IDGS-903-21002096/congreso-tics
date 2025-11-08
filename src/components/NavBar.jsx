import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import logoUTL from "../assets/logo-utl.jpg"; // ✅ Logo institucional

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-utl shadow-sm px-3">
      <div className="container-fluid">
        {/* BRAND: Logo + Texto */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logoUTL}
            alt="Logo UTL"
            className="logo-utl-nav me-2"
          />
          <span className="brand-text">Congreso TIC’s</span>
        </NavLink>

        {/* Botón hamburguesa (responsive) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de navegación */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/participantes">
                Participantes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/registro">
                Registro
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
