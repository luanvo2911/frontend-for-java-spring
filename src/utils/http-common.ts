import axios from "axios";

const BASE_URL: string | undefined = import.meta.env.VITE_API_URL;


const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

export default instance;