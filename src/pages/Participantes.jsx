import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Participantes.css";

import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";

const AVATAR_MAP = {
  "avatar1.png": avatar1,
  "avatar2.png": avatar2,
  "avatar3.png": avatar3,
};

// ✅ Función mejorada — maneja URLs, nombres y rutas tipo /src/assets/avatar3.png
const resolveAvatar = (avatarSeleccionado) => {
  if (!avatarSeleccionado)
    return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  // Si es URL externa
  if (/^https?:\/\//i.test(avatarSeleccionado)) return avatarSeleccionado;

  // Si viene con ruta local tipo "/src/assets/avatar3.png", toma solo el nombre
  const fileName = avatarSeleccionado.split("/").pop();

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

function Participantes() {
  const [busqueda, setBusqueda] = useState("");
  const [participantes, setParticipantes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const API_URL = "https://api-farmacia.ngrok.app/api/participante-qr";

  useEffect(() => {
    const obtenerParticipantes = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setParticipantes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al obtener los participantes:", err);
      } finally {
        setCargando(false);
      }
    };
    obtenerParticipantes();
  }, []);

  const participantesFiltrados = participantes.filter((p) => {
    const nombre = `${p?.nombre ?? ""} ${p?.apellidos ?? ""}`
      .trim()
      .toLowerCase();
    return nombre.includes(busqueda.toLowerCase());
  });

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 text-primary fw-bold titulo-participantes">
        Listado de Participantes
      </h2>

      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-75 w-md-50 shadow-sm"
          placeholder="🔍 Buscar participante..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="text-center mb-4">
        <Link to="/registro" className="btn btn-utl shadow-sm">
          + Registrar nuevo participante
        </Link>
      </div>

      {cargando ? (
        <p className="text-center text-muted">Cargando participantes...</p>
      ) : (
        <div className="row justify-content-center">
          {participantesFiltrados.length > 0 ? (
            participantesFiltrados.map((p) => {
              const fullName = `${p?.nombre ?? ""} ${p?.apellidos ?? ""}`.trim();
              const tw = formatTwitter(p?.usuarioTwitter);
              return (
                <div
                  key={p.idParticipante}
                  className="col-10 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <div className="card card-utl shadow-sm h-100 text-center p-3">
                    <img
                      src={resolveAvatar(p?.avatarSeleccionado)}
                      alt={fullName || "Participante"}
                      className="rounded-circle mx-auto mb-3 avatar-utl"
                    />
                    <h5 className="fw-bold text-dark">
                      {fullName || "Participante"}
                    </h5>
                    <p className="text-muted">
                      {p?.ocupacion || "Asistente"}
                    </p>

                    {tw ? (
                      <a
                        href={tw.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none text-utl"
                      >
                        {tw.text}
                      </a>
                    ) : (
                      <span className="text-muted">@usuario</span>
                    )}

                    <div className="mt-3">
                      <Link
                        to={`/gafete/${p.idParticipante}`}
                        className="btn-outline-utl"
                      >
                        Ver Gafete
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted">
              No se encontraron participantes.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Participantes;
