import axios from "axios";

const api = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const ApiGateway = axios.create({
  baseURL: api,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 1000 * 60 * 5 // 5 minutes
})
