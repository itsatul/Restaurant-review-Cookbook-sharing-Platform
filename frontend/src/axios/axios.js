import axios from "axios";

export const api = axios.create({
  baseURL: "https://luna-project-batch30.propulsion-learn.ch/backend/api/",

  // baseURL: "localhost:8000/backend/api/",
});