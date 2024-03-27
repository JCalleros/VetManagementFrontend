import axios from "axios";
require("dotenv").config();

const API_URL = process.env.API_URL;

const instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  withCredentials: true,
});

export default instance;
