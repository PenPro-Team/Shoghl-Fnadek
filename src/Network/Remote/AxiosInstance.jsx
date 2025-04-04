import axios from "axios";

let url = "http://127.0.0.1:8000";

export const AxiosProductsInstance = axios.create({
  baseURL: `${url}/products/`,
});

export const AxiosOrdersInstance = axios.create({
  baseURL: `${url}/api/orders`,
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});

// Add attachments instance
export const AxiosAttachmentsInstance = axios.create({
  baseURL: `${url}/attachments/`,
});

// Add request debugger
const requestDebugger = (config) => {
  console.log('Request Config:', {
    url: config.url,
    method: config.method,
    headers: config.headers,
    data: config.data
  });
  return config;
};

// Add response debugger
const responseDebugger = (response) => {
  console.log('Response:', {
    status: response.status,
    data: response.data,
    headers: response.headers
  });
  return response;
};

AxiosOrdersInstance.interceptors.request.use(requestDebugger);
AxiosOrdersInstance.interceptors.response.use(responseDebugger);

// Add request interceptor
AxiosOrdersInstance.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  if (auth.access) {
    config.headers.Authorization = `Bearer ${auth.access}`;
    console.log('Added auth token:', auth.access);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const AxiosRegisterInstance = axios.create({
  baseURL: `${url}/users/register/`,
});

export const AxiosLoginInstance = axios.create({
  baseURL: `${url}/users/login/`,
});
export const AxiosLogoutInstance = axios.create({
  baseURL: `${url}/users/logout/`,
});
