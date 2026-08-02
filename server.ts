import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

let currentDirname = "";
try {
  if (typeof __dirname !== "undefined") {
    currentDirname = __dirname;
  } else if (typeof import.meta !== "undefined" && import.meta.url) {
    currentDirname = path.dirname(fileURLToPath(import.meta.url));
  } else {
    currentDirname = path.resolve();
  }
} catch (e) {
  currentDirname = path.resolve();
}

const app = express();

async function setupApp() {
  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", project: "LeoFamily" });
  });

  // Serve public folder explicitly - this ensures assets like /fallback.png are available
  app.use(express.static(path.join(currentDirname, "public")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      // SPA fallback
      if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }
}

// Initialize app
setupApp();

// Only listen if not on Vercel
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
