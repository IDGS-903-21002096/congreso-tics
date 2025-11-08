import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registro.css";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";

function Registro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    usuarioTwitter: "",
    ocupacion: "",
    avatarSeleccionado: "",
    aceptaTerminos: false,
    codigoQR: "" // 👈 obligatorio aunque esté vacío
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.aceptaTerminos) {
      alert("Debes aceptar los términos y condiciones para continuar.");
      return;
    }
    if (!formData.avatarSeleccionado) {
      alert("Debes seleccionar un avatar.");
      return;
    }

    try {
      const response = await fetch("https://api-farmacia.ngrok.app/api/participante-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.isSuccess) {
        alert("✅ " + data.message);
        navigate("/participantes");
      } else {
        alert("⚠️ Error: " + (data.message || "No se pudo registrar el participante."));
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("❌ Error de conexión con el servidor.");
    }
  };

  return (
    <div className="registro-container d-flex align-items-center justify-content-center py-5">
      <div className="card registro-card shadow-lg p-4">
        <h2 className="text-center mb-4 titulo-registro">Registro de Participante</h2>

        <form onSubmit={handleSubmit}>
          {/* Campos de texto */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control input-utl"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Apellidos</label>
            <input
              type="text"
              name="apellidos"
              className="form-control input-utl"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Correo electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control input-utl"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Usuario en Twitter</label>
            <input
              type="text"
              name="usuarioTwitter"
              className="form-control input-utl"
              placeholder="@usuario"
              value={formData.usuarioTwitter}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Ocupación</label>
            <input
              type="text"
              name="ocupacion"
              className="form-control input-utl"
              value={formData.ocupacion}
              onChange={handleChange}
              required
            />
          </div>

          {/* Selección de Avatar */}
          <div className="text-center mb-4">
            <label className="d-block fw-semibold mb-2">Selecciona un Avatar</label>
            <div className="d-flex justify-content-center gap-4">
              {[
                { id: "avatar1", src: avatar1, label: "Avatar 1" },
                { id: "avatar2", src: avatar2, label: "Avatar 2" },
                { id: "avatar3", src: avatar3, label: "Avatar 3" },
              ].map((a) => (
                <div key={a.id} className="text-center">
                  <label htmlFor={a.id} className="avatar-label">
                    <img
                      src={a.src}
                      alt={a.label}
                      className={`avatar-option ${
                        formData.avatarSeleccionado === a.src ? "selected" : ""
                      }`}
                    />
                  </label>
                  <div>
                    <input
                      type="radio"
                      id={a.id}
                      name="avatarSeleccionado"
                      value={a.src}
                      checked={formData.avatarSeleccionado === a.src}
                      onChange={handleChange}
                    />{" "}
                    <small>{a.label}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Términos */}
          <div className="form-check mb-4 text-start">
            <input
              className="form-check-input"
              type="checkbox"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onChange={handleChange}
              id="terminos"
            />
            <label className="form-check-label" htmlFor="terminos">
              Leí y acepto los{" "}
              <a href="#" className="link-utl">
                términos y condiciones
              </a>
            </label>
          </div>

          {/* Botones */}
          <div className="text-center">
            <button type="submit" className="btn btn-utl px-5">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-3 px-4"
              onClick={() => navigate("/participantes")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;
