import axios from "axios";
import { BASE_URL, ENDPOINTS } from "./endpoints";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
};
