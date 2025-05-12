import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": process.env.API_URL ?? "http://localhost:4000/graphql",
    },
    hmr: { path: "hmr" },
  },
});
