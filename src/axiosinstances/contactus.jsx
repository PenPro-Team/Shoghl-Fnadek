import axios from "axios";

const contactus_axiosInstance = axios.create({
  baseURL: "/api", 
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default contactus_axiosInstance;
