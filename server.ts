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

  // Vite middleware for development (custom appType to allow express route interceptors)
  if (process.env.NODE_ENV !== "production") {
    viteInstance = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(viteInstance.middlewares);
  }

  // Helper to replace or inject SEO and Social Sharing metadata into HTML
  function injectMetaTags(html: string, tags: {
    title: string;
    description: string;
    url: string;
    image: string;
    imageAlt?: string;
    imageType?: string;
    siteName?: string;
    twitterTitle?: string;
    twitterDescription?: string;
  }): string {
    // Replace <title>
    html = html.replace(/<title>.*?<\/title>/i, `<title>${tags.title}</title>`);

    // Replace default description
    html = html.replace(
      /<meta name="description" content=".*?"\s*\/?>/i,
      `<meta name="description" content="${tags.description}" />`
    );

    // Strip default Open Graph, Twitter, and itemprop tags to avoid duplicate/conflicting first-match tags
    html = html.replace(/<meta property="og:[^"]+" content="[^"]*"\s*\/?>/gi, '');
    html = html.replace(/<meta property="twitter:[^"]+" content="[^"]*"\s*\/?>/gi, '');
    html = html.replace(/<meta name="twitter:[^"]+" content="[^"]*"\s*\/?>/gi, '');
    html = html.replace(/<meta itemprop="[^"]+" content="[^"]*"\s*\/?>/gi, '');

    const customMeta = `
    <!-- Tailored Open Graph & Social Sharing -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${tags.title}" />
    <meta property="og:description" content="${tags.description}" />
    <meta property="og:url" content="${tags.url}" />
    <meta property="og:image" content="${tags.image}" />
    <meta property="og:image:secure_url" content="${tags.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${tags.imageAlt || tags.title}" />
    ${tags.imageType ? `<meta property="og:image:type" content="${tags.imageType}" />` : ''}
    <meta property="og:site_name" content="${tags.siteName || 'LEO FAMILY OCCULT SCHOOL'}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${tags.twitterTitle || tags.title}" />
    <meta name="twitter:description" content="${tags.twitterDescription || tags.description}" />
    <meta name="twitter:image" content="${tags.image}" />
    `;

    if (html.includes('</head>')) {
      return html.replace('</head>', `${customMeta}\n  </head>`);
    }
    return html + customMeta;
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

      if (process.env.NODE_ENV !== "production" && viteInstance) {
        html = await viteInstance.transformIndexHtml(req.originalUrl, html);
      }

      html = injectMetaTags(html, {
        title: "Leo Family Meditation Academy | Meditation with Raajeev Singh Chauhann",
        description: "Learn Meditation, Inner Healing, Chakra Balancing, Akashic Records & Spiritual Practices with Raajeev Singh Chauhann — Meditation Coach, Spiritual Healer, Life Coach & Occult Teacher.",
        url: "https://www.leofamily.online/meditation",
        image: "https://www.leofamily.online/assets/teachers/Raajeev.webp",
        imageType: "image/webp",
        imageAlt: "Raajeev Singh Chauhann - Leo Family Meditation Academy",
        siteName: "LEO FAMILY OCCULT SCHOOL",
        twitterTitle: "Leo Family Meditation Academy | Meditation with Raajeev Singh Chauhann",
        twitterDescription: "Learn Meditation, Inner Healing, Chakra Balancing, Akashic Records & Spiritual Practices with Raajeev Singh Chauhann."
      });

      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (err) {
      next(err);
    }
  });

  // Dedicated SEO/Social sharing metadata handler for /gemstones and /gemstones/:slug
  app.get(["/gemstones", "/gemstones/:slug"], async (req, res, next) => {
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

      if (process.env.NODE_ENV !== "production" && viteInstance) {
        html = await viteInstance.transformIndexHtml(req.originalUrl, html);
      }

      const slug = req.params.slug;
      const title = slug 
        ? `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | LEO Family Sacred Vedic Gemstones`
        : "Discover Your Sacred Gemstone | LEO Family Occult School";
      const desc = slug
        ? `Authentic 100% natural, lab-certified ${slug.replace(/-/g, ' ')} energized with Vedic Pran Pratishtha rituals by LEO Family Occult School.`
        : "Explore certified natural Vedic gemstones aligned with your planetary frequencies, energized under Raajeev Singh Chauhann & LEO Family masters.";
      const currentUrl = `https://www.leofamily.online${req.path}`;
      
      const gemImages: Record<string, string> = {
        'ruby-manik': 'ruby.jpg',
        'natural-pearl-moti': 'pearl.jpg',
        'red-coral-moonga': 'red-coral.jpg',
        'emerald-panna': 'emerald.jpg',
        'yellow-sapphire-pukhraj': 'yellow-sapphire.jpg',
        'diamond-heera': 'diamond.jpg',
        'blue-sapphire-neelam': 'blue-sapphire.jpg',
        'hessonite-gomed': 'gomed.jpg',
        'cats-eye-lehsunia': 'cats-eye.jpg'
      };

      const selectedImg = slug && gemImages[slug] ? gemImages[slug] : 'ruby.jpg';
      const imageUrl = `https://www.leofamily.online/gemstone-assets/${selectedImg}`;

      html = injectMetaTags(html, {
        title,
        description: desc,
        url: currentUrl,
        image: imageUrl,
        imageAlt: title,
        siteName: "LEO FAMILY OCCULT SCHOOL"
      });

      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (err) {
      next(err);
    }
  });

  // Development SPA fallback for all other routes
  if (process.env.NODE_ENV !== "production" && viteInstance) {
    app.use("*", async (req, res, next) => {
      try {
        if (req.path.startsWith('/api')) {
          return next();
        }
        let template = fs.readFileSync(path.join(currentDirname, "index.html"), "utf-8");
        template = await viteInstance.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).send(template);
      } catch (e: any) {
        viteInstance.ssrFixStacktrace(e);
        next(e);
      }
    });
  }

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
