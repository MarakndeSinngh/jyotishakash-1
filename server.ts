import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
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

  let viteInstance: any = null;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    viteInstance = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(viteInstance.middlewares);
  }

  // Dedicated SEO/Social sharing metadata handler for /meditation
  app.get("/meditation", async (req, res, next) => {
    try {
      let indexPath = "";
      if (process.env.NODE_ENV === "production") {
        indexPath = path.join(process.cwd(), "dist", "index.html");
      } else {
        indexPath = path.join(currentDirname, "index.html");
      }

      if (!fs.existsSync(indexPath)) {
        indexPath = path.join(currentDirname, "index.html");
      }

      let html = fs.readFileSync(indexPath, "utf-8");

      // Replace title and description
      html = html.replace(
        /<title>.*?<\/title>/i,
        `<title>Leo Family Meditation Academy | Meditation with Raajeev Singh Chauhann</title>`
      );
      html = html.replace(
        /<meta name="description" content=".*?"\s*\/?>/i,
        `<meta name="description" content="Learn Meditation, Inner Healing, Chakra Balancing, Akashic Records & Spiritual Practices with Raajeev Singh Chauhann — Meditation Coach, Spiritual Healer, Life Coach & Occult Teacher." />`
      );

      const meditationMetaTags = `
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Leo Family Meditation Academy | Meditation with Raajeev Singh Chauhann" />
    <meta property="og:description" content="Learn Meditation, Inner Healing, Chakra Balancing, Akashic Records & Spiritual Practices with Raajeev Singh Chauhann — Meditation Coach, Spiritual Healer, Life Coach & Occult Teacher." />
    <meta property="og:url" content="https://www.leofamily.online/meditation" />
    <meta property="og:image" content="https://www.leofamily.online/assets/teachers/Raajeev.webp" />
    <meta property="og:image:secure_url" content="https://www.leofamily.online/assets/teachers/Raajeev.webp" />
    <meta property="og:image:type" content="image/webp" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Raajeev Singh Chauhann - Leo Family Meditation Academy" />
    <meta property="og:site_name" content="LEO FAMILY OCCULT SCHOOL" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Leo Family Meditation Academy | Meditation with Raajeev Singh Chauhann" />
    <meta name="twitter:description" content="Learn Meditation, Inner Healing, Chakra Balancing, Akashic Records & Spiritual Practices with Raajeev Singh Chauhann." />
    <meta name="twitter:image" content="https://www.leofamily.online/assets/teachers/Raajeev.webp" />
      `;

      if (html.includes('</head>')) {
        html = html.replace('</head>', `${meditationMetaTags}\n</head>`);
      } else {
        html += meditationMetaTags;
      }

      if (process.env.NODE_ENV !== "production" && viteInstance) {
        html = await viteInstance.transformIndexHtml(req.url, html);
      }

      res.send(html);
    } catch (err) {
      next(err);
    }
  });

  if (process.env.NODE_ENV === "production") {
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
