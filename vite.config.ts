import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin";

export default defineConfig({
  plugins: [react(), tailwindcss(), netlify()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
