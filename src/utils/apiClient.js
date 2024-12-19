import axios from "axios";
import endpoint from "../config/config";

const BASE_URL = `${endpoint}/api`;

export const apiClient = axios.create({
  baseURL: BASE_URL,
});
