import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    base: "http://www.example.com",
    server: {
        cors: {
            origin: [
                /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/,
                "https://u05-restful-api-terra.onrender.com"
            ]
        }
    }
});