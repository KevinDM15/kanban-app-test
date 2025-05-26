import axios from "axios";

export const ApiGateway = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 1000 * 60 * 5 // 5 minutes
})
