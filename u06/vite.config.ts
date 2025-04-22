import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        cors: {
            origin: [
                /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/,
                "https://u05-restful-api-terra.onrender.com"
            ]
        }
    }
});