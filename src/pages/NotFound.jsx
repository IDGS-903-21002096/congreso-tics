import React from "react";
import { Link, useRouteError } from "react-router-dom";
import "./NotFound.css";
import logoUTL from "../assets/logo-utl.jpg"; // Reutilizamos el logo institucional

const NotFound = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="notfound-container d-flex flex-column align-items-center justify-content-center text-center">
      {/* Logo institucional */}
      <img src={logoUTL} alt="Logo UTL" className="notfound-logo mb-3" />

      {/* Código de error */}
      <h1 className="notfound-title">404</h1>
      <p className="notfound-subtitle">Página no encontrada</p>

      {/* Mensaje del error */}
      {error && (
        <p className="notfound-error text-muted">
          {error.statusText || error.message}
        </p>
      )}

      {/* Botón volver al inicio */}
      <Link to="/" className="btn btn-utl mt-3 px-4 py-2">
        Volver al inicio
      </Link>

      {/* Pie con lema institucional */}
      <p className="notfound-footer mt-4">
        Universidad Tecnológica de León <br />
        <span className="fw-light">“Ser, saber, hacer”</span>
      </p>
    </div>
  );
};

export default NotFound;
