// src/api/participantesService.js
import api from "./api";

// Obtener todos
export const getParticipantes = async () => {
  const response = await api.get("/api/participante-qr");
  return response.data;
};

// Obtener por ID
export const getParticipanteById = async (id) => {
  const response = await api.get(`/api/participante-qr/${id}`);
  return response.data;
};

// Crear nuevo
export const createParticipante = async (data) => {
  const response = await api.post("/api/participante-qr", data);
  return response.data;
};

// Eliminar por ID
export const deleteParticipante = async (id) => {
  await api.delete(`/api/participante-qr/${id}`);
};
