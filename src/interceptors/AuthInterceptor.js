import axios from 'axios';

// Create an instance of axios with a custom config
const api = axios.create({
  baseURL: 'https://snappromise.com:8080'
});

api.interceptors.request.use(
  (config) => {
    // You can modify the request config here (e.g., adding headers)
    config.headers.common['Authorization'] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTm8iOiJjOTllNmNkMS1iZjVlLTQ1ZjEtODI4MC1mNWI2OGViNTMzZDAiLCJmaXJzdE5hbWUiOiJXYWxlZWQiLCJsYXN0TmFtZSI6IklmdGlraGFyIiwiUGhvbmVObyI6IiIsImVtYWlsSUQiOiJ3YWxlZWRpZnRpa2hhcjA4QGdtYWlsLmNvbSIsImlzYWN0aXZlIjoiMCIsImFkZERhdGUiOiIwMi8wNy8yMDI0IDA5OjQxOjQ2Iiwicm9sZSI6IiIsInBhc3N3b3JkIjoiR0RFQkMiLCJleHAiOjE3MDczMDYxMDYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCJ9.7TsuULJgwZkixhik85LyKX9-wrfXkpHlOMbMXI_exKY`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
