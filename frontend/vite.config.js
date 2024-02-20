// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            external: [
                "react",
                "react-dom",
                "react-router-dom",
                "bootstrap/dist/css/bootstrap.min.css",
                "axios",
            ],
        },
    },
    esbuild: {
        jsxInject: `import React from 'react'`,
    },
});
