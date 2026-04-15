import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

const RAFIQ_AI_TARGET =
  "https://rafiq-ai-app-gugrccaxbfhydvhr.germanywestcentral-01.azurewebsites.net";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    proxy: {
      // Same-origin in dev → avoids browser CORS when the Azure app has no CORS headers
      "/rafiq-ai-api": {
        target: RAFIQ_AI_TARGET,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rafiq-ai-api/, ""),
      },
    },
  },
});
