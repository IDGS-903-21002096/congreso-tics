import React from "react";
import { useNavigate } from "react-router-dom";
import "./Inicio.css"; // archivo de estilos personalizado
import logoUTL from "../assets/logo-utl.jpg";

function Inicio() {
  const navigate = useNavigate();

  const manejarEntrada = () => {
    navigate("/participantes");
  };

  return (
    <div className="inicio-container d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <img src={logoUTL} alt="Logo UTL" className="inicio-logo mb-3" />
      <h1 className="inicio-titulo mb-2">Congreso de Tecnologías de la Información</h1>
      <p className="inicio-subtitulo mb-4">Universidad Tecnológica de León</p>
      <button className="btn btn-light btn-lg shadow-sm" onClick={manejarEntrada}>
        Entrar
      </button>
    </div>
  );
}

export default Inicio;
