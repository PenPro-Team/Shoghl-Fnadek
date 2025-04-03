import axios from "axios";

let url = "http://127.0.0.1:8000";

export const AxiosProductsInstance = axios.create({
  baseURL: `${url}/products/`,
});

export const AxiosOrdersInstance = axios.create({
  baseURL: `${url}/api/orders`,  // Updated to match new API endpoint
});
