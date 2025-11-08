import axios from "axios";

const api = axios.create({
  baseURL: "https://api-farmacia.ngrok.app",
});

export default api;
