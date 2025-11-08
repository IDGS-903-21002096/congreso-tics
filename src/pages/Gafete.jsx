import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Gafete.css";
import logoUTL from "../assets/logo-utl.jpg";
import logoSEG from "../assets/LogoSEG_azul.png";

import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";

const AVATAR_MAP = {
  "avatar1.png": avatar1,
  "avatar2.png": avatar2,
  "avatar3.png": avatar3,
};

// ✅ Función mejorada: soporta URLs, nombres y rutas tipo /src/assets/avatar3.png
const resolveAvatar = (avatarSeleccionado) => {
  if (!avatarSeleccionado)
    return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  // Si es una URL externa (http o https)
  if (/^https?:\/\//i.test(avatarSeleccionado)) return avatarSeleccionado;

  // Si viene con ruta local tipo "/src/assets/avatar3.png", extrae solo el nombre
  const fileName = avatarSeleccionado.split("/").pop();

  // Devuelve la imagen correspondiente del mapa
  return (
    AVATAR_MAP[fileName] ||
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
};

const formatTwitter = (usuarioTwitter) => {
  if (!usuarioTwitter) return null;
  const handle = usuarioTwitter.replace(/^@/, "");
  return { text: `@${handle}`, url: `https://twitter.com/${handle}` };
};

function Gafete() {
  const { id } = useParams();
  const [participante, setParticipante] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `https://api-farmacia.ngrok.app/api/participante-qr/${id}`;

  useEffect(() => {
    const obtenerParticipante = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setParticipante(data || null);
      } catch (err) {
        console.error("Error al obtener participante:", err);
        setError("No se encontró el participante o el servidor no responde.");
      } finally {
        setCargando(false);
      }
    };
    obtenerParticipante();
  }, [id]);

  if (cargando) {
    return (
      <div className="container text-center my-5">
        <h3 className="text-muted">Cargando información del gafete...</h3>
      </div>
    );
  }

  if (error || !participante) {
    return (
      <div className="container text-center my-5">
        <h3 className="text-danger">{error || "Participante no encontrado"}</h3>
        <Link to="/participantes" className="btn btn-utl mt-3">
          Volver al listado
        </Link>
      </div>
    );
  }

  const fullName = `${participante?.nombre ?? ""} ${
    participante?.apellidos ?? ""
  }`.trim();
  const tw = formatTwitter(participante?.usuarioTwitter);

  return (
    <div className="gafete-wrapper">
      <div className="gafete-container">
        {/* === CARA FRONTAL (NO SE TOCA) === */}
        <div className="gafete-card front shadow-lg">
          <div className="header-pattern"></div>
          <div className="avatar-container">
            <img
              src={resolveAvatar(participante?.avatarSeleccionado)}
              alt={fullName || "Participante"}
              className="avatar-img"
            />
          </div>
          <h3 className="nombre">{fullName || "Participante"}</h3>
          <p className="ocupacion">{participante?.ocupacion || "Asistente"}</p>
          <div className="divider"></div>
          <img src={logoUTL} alt="UTL Logo" className="logo-utl grande" />
          <p className="lema">Ser, saber, hacer</p>
          <div className="footer-band"></div>
        </div>

        {/* === CARA TRASERA (solo se cambia el logo por el QR) === */}
        <div className="gafete-card back shadow-lg">
          {participante?.codigoQR ? (
            <div className="qr-container">
              <img
                src={participante.codigoQR}
                alt="Código QR del participante"
                className="qr-image"
              />
              <p className="qr-text">Escanea tu registro</p>
            </div>
          ) : (
            <p className="text-muted">QR no disponible</p>
          )}

          <h4 className="nombre">{fullName || "Participante"}</h4>

          <p className="twitter">
            {tw ? (
              <a
                href={tw.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-utl"
              >
                {tw.text}
              </a>
            ) : (
              "@usuario"
            )}
          </p>

          <div className="redes">
            <p>🌐 www.utleon.edu.mx</p>
            <p>📧 contacto@utleon.edu.mx</p>
            <p>📍 León, Gto., México</p>
          </div>

          <div className="logo-seg-container">
            <img
              src={logoSEG}
              alt="Secretaría de Educación"
              className="logo-seg"
            />
          </div>
        </div>
      </div>

      <Link to="/participantes" className="btn-utl mt-4">
        ← Volver al listado
      </Link>
    </div>
  );
}

export default Gafete;
