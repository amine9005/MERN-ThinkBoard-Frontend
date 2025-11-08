import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-thinkboard-backend-xvft.onrender.com/api/v1",
});

export default api;
