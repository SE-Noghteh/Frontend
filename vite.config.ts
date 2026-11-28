import path from "path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://senoghteh.fpna.ir",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/v1"),
        secure: true,
      },
    },
  },
});