import axios from "axios";

const API_URL = "http://localhost:8000/api";

const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export async function get(url) {
  const response = await http.get(url);
  return response.data;
}

export async function post(url, data = {}) {
  const response = await http.post(url, data);
  return response.data;
}

export async function put(url, data = {}) {
  const response = await http.put(url, data);
  return response.data;
}

export async function patch(url, data = {}) {
  const response = await http.patch(url, data);
  return response.data;
}

export async function remove(url, data) {
  const response = await http.delete(url, data);
  return response.data;
}
