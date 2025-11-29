import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy API endpoints to backend to avoid CORS during development
      "/api/parkinson": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/api/diabetes": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/api/heart": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/items": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        bypass: (req) => {
          if (
            req.headers &&
            req.headers.accept &&
            req.headers.accept.includes("text/html")
          ) {
            return "/index.html";
          }
          return null;
        },
      },
      "/users": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        bypass: (req) => {
          if (
            req.headers &&
            req.headers.accept &&
            req.headers.accept.includes("text/html")
          ) {
            return "/index.html";
          }
          return null;
        },
      },
    },
  },
});
